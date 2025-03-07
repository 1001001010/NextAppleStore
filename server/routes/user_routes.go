package routes

import (
	"github.com/gin-gonic/gin"
	"server/controllers"
	"server/middleware"
)

func UserRoutes(router *gin.Engine) {
	userGroup := router.Group("/")
	{
		userGroup.GET("validate", middleware.RequireAuth, controllers.Validate)
		userGroup.GET("logout", middleware.RequireAuth, controllers.Logout)

		userGroup.POST("register", controllers.SignUp)
		userGroup.POST("login", controllers.SignIn)

		userGroup.PUT("update-username", middleware.RequireAuth, controllers.ChangeUsername)

		userGroup.DELETE("delete-user", middleware.RequireAuth, controllers.DeleteUser)
	}
}
