package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver

	"github.com/syedwshah/PartyGem/server/pkg/handlers"
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
	"github.com/syedwshah/PartyGem/server/pkg/services"
)

func main() {
    // Load environment variables
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbName := os.Getenv("DB_NAME")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")

    // Create a database connection
    dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        log.Fatalf("Error opening database connection: %s\n", err.Error())
    }
    defer db.Close()

    // Initialize repositories
    userRepo := repositories.NewUserRepository(db)
    authRepo := repositories.NewAuthRepository(db)

    // Initialize services
    userService := &services.UserService{UserRepo: userRepo}
    authService := &services.AuthService{AuthRepo: authRepo}

    // Initialize handlers
    userHandler := &handlers.UserHandler{UserService: userService}
    authHandler := &handlers.AuthHandler{AuthService: authService}

    router := http.NewServeMux()
    router.HandleFunc("/register", userHandler.RegisterUser)
    router.HandleFunc("/login", authHandler.Login)

    log.Println("Starting server on :8080...")
    if err := http.ListenAndServe(":8080", router); err != nil {
        log.Fatalf("Could not start server: %s\n", err.Error())
    }
}
