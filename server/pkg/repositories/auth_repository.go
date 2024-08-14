package repositories

import (
	"database/sql"
)

type AuthRepository struct {
    db *sql.DB
}

func NewAuthRepository(db *sql.DB) *AuthRepository {
    return &AuthRepository{db: db}
}

// Add your methods here
