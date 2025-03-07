package controllers

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"net/http"
	"os"
	"server/config"
	"server/models"
	"server/utils"
	"time"
)

func SignUp(c *gin.Context) {
	//get the email/password off req body
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Username string `json:"username"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//validate email
	if body.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{"emailError": "Email is required"})
		return
	}
	//validate email format
	if !utils.IsValidEmail(body.Email) {
		c.JSON(http.StatusBadRequest, gin.H{"emailError": "Invalid email format"})
		return
	}

	//validate username
	if body.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"usernameError": "Username is required"})
		return
	}

	//validate username length
	if !utils.IsValidUsername(body.Username) {
		c.JSON(http.StatusBadRequest, gin.H{"usernameError": "Username must be at least 4 characters"})
		return
	}

	//validates password
	if body.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"passwordError": "Password is required"})
		return
	}

	//validates pass length, char, spec char
	if !utils.IsValidPassword(body.Password) {
		c.JSON(http.StatusBadRequest, gin.H{"passwordError": "Password must be at least 10 characters long, with uppercase letter, and a special character"})
		return
	}

	//hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}

	//create a user
	user := models.User{
		Email:    body.Email,
		Username: body.Username,
		Password: string(hash),
	}
	result := config.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user"})
		return
	}

	//respond
	c.JSON(http.StatusCreated, gin.H{"success": "Account created! Please confirm your email."})
}

func SignIn(c *gin.Context) {
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	//look up req user
	var user models.User
	config.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"errorLogin": "Invalid email or password"})
		return
	}

	//compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errorLogin": "Invalid email or password"})
		return
	}

	//generate jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create token"})
		return
	}

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
		MaxAge:   int((time.Hour * 24 * 30).Seconds()),
		Path:     "/",
	})

	c.JSON(http.StatusOK, gin.H{"successLogin": "Login successful!"})

}

func Validate(c *gin.Context) {
	user, exists := c.Get("user")

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"errorValidate": "Unauthorized"})
		return
	}

	userModel, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"errorValidate": "Failed to retrieve user"})
		return
	}

	//respond with user data
	c.JSON(http.StatusOK, gin.H{
		"id":       userModel.ID,
		"email":    userModel.Email,
		"username": userModel.Username,
	})
}

func Logout(c *gin.Context) {
	//delete the jwt cookie
	c.SetCookie("token", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"successLogout": "Logged out successfully",
	})
}

func DeleteUser(c *gin.Context) {
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	result := config.DB.Delete(&currentUser)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.SetCookie("token", "", -1, "/", "", false, true)

	c.JSON(http.StatusOK, gin.H{
		"successDelete": "User deleted successfully",
	})
}

func ChangeUsername(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	currentUser, ok := user.(models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
		return
	}

	var body struct {
		NewUsername string `json:"newUsername"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	if body.NewUsername == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username is required"})
		return
	}

	if !utils.IsValidUsername(body.NewUsername) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid username format"})
		return
	}

	var existingUser models.User
	result := config.DB.First(&existingUser, "username = ?", body.NewUsername)
	if result.Error == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already taken"})
		return
	} else if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
	}

	currentUser.Username = body.NewUsername
	if err := config.DB.Save(&currentUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update username"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "Username updated successfully!"})
}
