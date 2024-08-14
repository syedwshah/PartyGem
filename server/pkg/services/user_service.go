package services

import (
	"errors"
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

// RegisterUser registers a new user in the system.
func (s *UserService) RegisterUser(user *models.User, password string) error {
	// Check if user already exists
	existingUser, _ := s.repo.FindByEmail(user.Email)
	if existingUser != nil {
		return errors.New("user already exists")
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.PasswordHash = string(hashedPassword)

	// Set created_at and updated_at
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()

	// Save the user
	if err := s.repo.CreateUser(user); err != nil {
		return err
	}

	// Ensure the user ID is set (if using MySQL's LAST_INSERT_ID())
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
