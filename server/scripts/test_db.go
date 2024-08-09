package main

import (
	"fmt"
	"log"

	"github.com/syedwshah/PartyGem/server/pkg/config"
	"github.com/syedwshah/PartyGem/server/pkg/config/database"
)

func main() {
	cfg := config.LoadConfig()
	db, err := database.SetupDatabase(cfg)
	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	defer db.Close()

	fmt.Println("Database connection successful!")
}
