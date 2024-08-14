package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/syedwshah/PartyGem/server/pkg/services"
)

type AuthHandler struct {
    service *services.AuthService
}

func NewAuthHandler(service *services.AuthService) *AuthHandler {
    return &AuthHandler{service: service}
}

func (h *AuthHandler) LoginUser(c *gin.Context) {
    // Implementation goes here
}
