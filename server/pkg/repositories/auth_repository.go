package repositories

import (
	"database/sql"

	"github.com/syedwshah/PartyGem/server/pkg/models"
)

type AuthRepository struct {
	db *sql.DB
}

func NewAuthRepository(db *sql.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) FindByEmail(email string) (*models.User, error) {
	user := &models.User{}
	query := "SELECT id, email, phone_number, password_hash, name FROM users WHERE email = ?"
	err := r.db.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.PhoneNumber, &user.PasswordHash, &user.Name)
	if err != nil {
		return nil, err
	}
	return user, nil
}
