package utils

import "regexp"

func IsValidEmail(email string) bool {
	regex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	re := regexp.MustCompile(regex)
	return re.MatchString(email)
}

func IsValidUsername(username string) bool {
	return len(username) >= 4
}

func IsValidPassword(password string) bool {
	hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
	hasSpecial := regexp.MustCompile(`[!@#$%^&*]`).MatchString(password)
	isLongEnough := len(password) >= 10

	return hasUpper && hasSpecial && isLongEnough
}
