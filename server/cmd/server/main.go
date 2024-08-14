package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"github.com/syedwshah/PartyGem/server/pkg/config"
	"github.com/syedwshah/PartyGem/server/pkg/config/database"
	"github.com/syedwshah/PartyGem/server/pkg/handlers"
	"github.com/syedwshah/PartyGem/server/pkg/repositories"
	"github.com/syedwshah/PartyGem/server/pkg/services"
)

func main() {
    // Load environment variables
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file")
    }
    
    // Load configuration
    cfg := config.LoadConfig()

    // Initialize database connection
    db, err := database.ConnectDB(cfg)
    if err != nil {
        log.Fatalf("Error connecting to the database: %v", err)
    }

    // Initialize repositories
    userRepo := repositories.NewUserRepository(db)
    authRepo := repositories.NewAuthRepository(db)

    // Initialize services
    userService := services.NewUserService(userRepo)
    authService := services.NewAuthService(authRepo, cfg.JWTSecret)

    // Initialize handlers
    userHandler := handlers.NewUserHandler(userService)
    authHandler := handlers.NewAuthHandler(authService)

    // Set up router and start server
    r := setupRouter(userHandler, authHandler)
    port := os.Getenv("SERVER_PORT")
    if port == "" {
        port = "8080"
    }
    logrus.Infof("Server starting on port %s", port)
    if err := r.Run(":" + port); err != nil {
        log.Fatalf("Error starting server: %v", err)
    }
}

// setupRouter sets up the Gin router with the provided handlers.
func setupRouter(userHandler *handlers.UserHandler, authHandler *handlers.AuthHandler) *gin.Engine {
    r := gin.Default()

    r.GET("/", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"message": "Welcome to PartyGem API!"})
    })

    // Set up routes
    r.POST("/register", userHandler.RegisterUser)
    r.POST("/login", authHandler.LoginUser)
    r.GET("/users/:id", userHandler.GetUserByID)
    r.GET("/users/username/:username", userHandler.GetUserByUsername)
    r.GET("/users/email/:email", userHandler.GetUserByEmail)
    r.PUT("/users/:id", userHandler.UpdateUser)
    r.DELETE("/users/:id", userHandler.DeleteUser)

    return r
}

