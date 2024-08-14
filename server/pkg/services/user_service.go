package services

import (
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
)

type UserService struct {
    repo *repositories.UserRepository
    jwtSecret string
}

func NewUserService(repo *repositories.UserRepository, jwtSecret string) *UserService {
    return &UserService{repo: repo, jwtSecret: jwtSecret}
}

// Add your methods here
