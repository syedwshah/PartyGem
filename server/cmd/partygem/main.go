package main

import (
	"log"
	"net/http"
)

func main() {
    router := http.NewServeMux()

    // TODO: Set up routes and handlers

    log.Println("Starting server on :8080...")
    if err := http.ListenAndServe(":8080", router); err != nil {
        log.Fatalf("Could not start server: %s\n", err.Error())
    }
}
