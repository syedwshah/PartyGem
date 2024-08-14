package services

import (
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
)

type AuthService struct {
    repo *repositories.AuthRepository
    jwtSecret string
}

func NewAuthService(repo *repositories.AuthRepository, jwtSecret string) *AuthService {
    return &AuthService{repo: repo, jwtSecret: jwtSecret}
}

// Add your methods here
