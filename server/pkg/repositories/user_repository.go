package repositories

import (
	"database/sql"

	"github.com/syedwshah/PartyGem/server/pkg/models"
)

type UserRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) CreateUser(user *models.User) error {
	query := "INSERT INTO users (email, phone_number, password_hash, name) VALUES (?, ?, ?, ?)"
	_, err := r.db.Exec(query, user.Email, user.PhoneNumber, user.PasswordHash, user.Name)
	return err
}

func (r *UserRepository) FindByID(id int) (*models.User, error) {
	user := &models.User{}
	query := "SELECT id, email, phone_number, password_hash, name FROM users WHERE id = ?"
	err := r.db.QueryRow(query, id).Scan(&user.ID, &user.Email, &user.PhoneNumber, &user.PasswordHash, &user.Name)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) FindByUsername(username string) (*models.User, error) {
	user := &models.User{}
	query := "SELECT id, email, phone_number, password_hash, name FROM users WHERE username = ?"
	err := r.db.QueryRow(query, username).Scan(&user.ID, &user.Email, &user.PhoneNumber, &user.PasswordHash, &user.Name)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) FindByEmail(email string) (*models.User, error) {
	user := &models.User{}
	query := "SELECT id, email, phone_number, password_hash, name FROM users WHERE email = ?"
	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.PhoneNumber, &user.PasswordHash, &user.Name)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) UpdateUser(user *models.User) error {
	query := "UPDATE users SET email = ?, phone_number = ?, password_hash = ?, name = ? WHERE id = ?"
	_, err := r.db.Exec(query, user.Email, user.PhoneNumber, user.PasswordHash, user.Name, user.ID)
	return err
}

func (r *UserRepository) DeleteUser(id int) error {
	query := "DELETE FROM users WHERE id = ?"
	_, err := r.db.Exec(query, id)
	return err
}

