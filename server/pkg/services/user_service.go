package services

import (
	"errors"
	"log"
	"strings"
	"time"

	"github.com/syedwshah/PartyGem/server/pkg/models"
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repositories.UserRepository
}

func NewUserService(repo *repositories.UserRepository) *UserService {
	return &UserService{repo: repo}
}


func (s *UserService) RegisterUser(user *models.User, password string) error {
    // Trim any leading or trailing spaces from the password
    password = strings.TrimSpace(password)

    // Debugging: Print the password and its length
    log.Printf("Password: '%s', Length: %d", password, len(password))

    // Enforce minimum password length
    const minPasswordLength = 8
    if len(password) < minPasswordLength {
        log.Printf("Password is too short: %d characters", len(password))
        return errors.New("password must be at least 8 characters long")
    }

    // Proceed with the rest of the registration logic...
    existingUser, _ := s.repo.FindByEmail(user.Email)
    if existingUser != nil {
        return errors.New("user already exists")
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    user.PasswordHash = string(hashedPassword)
    user.CreatedAt = time.Now()
    user.UpdatedAt = time.Now()

    if err := s.repo.CreateUser(user); err != nil {
        return err
    }

    savedUser, err := s.repo.FindByEmail(user.Email)
    if err != nil {
        return err
    }
    user.ID = savedUser.ID

    return nil
}


// GetUserByID fetches a user by their ID.
func (s *UserService) GetUserByID(id int) (*models.User, error) {
	return s.repo.FindByID(id)
}

// GetUserByUsername fetches a user by their username.
func (s *UserService) GetUserByUsername(username string) (*models.User, error) {
	return s.repo.FindByUsername(username)
}

// GetUserByEmail fetches a user by their email.
func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
	return s.repo.FindByEmail(email)
}

// UpdateUser updates the user's information.
func (s *UserService) UpdateUser(user *models.User) error {
	return s.repo.UpdateUser(user)
}

// DeleteUser deletes a user by their ID.
func (s *UserService) DeleteUser(id int) error {
	return s.repo.DeleteUser(id)
}
