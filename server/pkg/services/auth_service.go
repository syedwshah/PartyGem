package services

import (
	"errors"
	"log"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo      *repositories.AuthRepository
	jwtSecret string
}

func NewAuthService(repo *repositories.AuthRepository, jwtSecret string) *AuthService {
	return &AuthService{repo: repo, jwtSecret: jwtSecret}
}

func (s *AuthService) LoginUser(email, password string) (string, error) {
    user, err := s.repo.FindByEmail(email)
    if err != nil || user == nil {
        log.Println("User not found or error retrieving user")
        return "", errors.New("invalid credentials")
    }

    log.Printf("Stored Hash: %s", user.PasswordHash)
    log.Printf("Password to Compare: %s", password)

    err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
    if err != nil {
        log.Println("Password comparison failed")
        return "", errors.New("invalid credentials")
    }

    token, err := s.generateToken(user.ID)
    if err != nil {
        log.Println("Token generation failed")
        return "", err
    }

    return token, nil
}


// generateToken generates a JWT token for the authenticated user.
func (s *AuthService) generateToken(userID int) (string, error) {
	claims := &jwt.StandardClaims{
		Subject:   strconv.Itoa(userID),  // Convert int to string correctly
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.jwtSecret))
}
