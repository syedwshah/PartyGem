# Define environment variables and tools
MOCKERY=mockery --quiet
MOCK_TARGETS=AuthRepository AuthService UserRepository UserService
MOCK_DIRS=./pkg/repositories ./pkg/services
MOCK_OUTPUT=./mocks

# Default target
run:
	go run cmd/server/main.go

# Target to run all tests
test:
	go test ./...

# Target to run tests with coverage
test-cover:
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

# Target to build the project
build:
	go build -o bin/partygem cmd/server/main.go

# Target to create a new migration
migration-create:
	migrate create -ext sql -dir migrations -seq $(NAME)

# Target to apply migrations
migrate-up:
	@echo "Applying migrations..."
	@source .env && migrate -path migrations -database "mysql://$$DB_USER:$$DB_PASSWORD@tcp($$DB_HOST:$$DB_PORT)/$$DB_NAME" -verbose up

# Target to revert migrations
migrate-down:
	migrate -path migrations -database "mysql://$(DB_USER):$(DB_PASSWORD)@tcp($(DB_HOST):$(DB_PORT))/$(DB_NAME)" -verbose down

# Target to drop all migrations
migrate-drop:
	migrate -path migrations -database "mysql://$(DB_USER):$(DB_PASSWORD)@tcp($(DB_HOST):$(DB_PORT))/$(DB_NAME)" drop -f

# Target to list all migrations
migration-list:
	migrate -path migrations -database "mysql://$(DB_USER):$(DB_PASSWORD)@tcp($(DB_HOST):$(DB_PORT))/$(DB_NAME)" version

# Target to generate mocks
mocks: clean-mocks
	@echo "Generating mocks..."
	@$(foreach target,$(MOCK_TARGETS), $(foreach dir,$(MOCK_DIRS), $(MOCKERY) --name=$(target) --dir=$(dir) --output=$(MOCK_OUTPUT);))

# Target to clean mock files
clean-mocks:
	rm -rf $(MOCK_OUTPUT)/*.go

# Declare phony targets to avoid conflicts with files
.PHONY: run test test-cover build migration-create migrate-up migrate-down migrate-drop migration-list mocks clean-mocks
