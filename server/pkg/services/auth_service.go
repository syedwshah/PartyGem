package services

import (
	"errors"
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

// LoginUser logs in a user by verifying their credentials and returns a JWT token.
func (s *AuthService) LoginUser(email, password string) (string, error) {
	user, err := s.repo.FindByEmail(email)
	if err != nil || user == nil {
		return "", errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	token, err := s.generateToken(user.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}

// generateToken generates a JWT token for the authenticated user.
func (s *AuthService) generateToken(userID int) (string, error) {
	claims := &jwt.StandardClaims{
		Subject:   string(userID),
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(s.jwtSecret))
}
