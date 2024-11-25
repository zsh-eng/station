package main

import (
	"context"
	"encoding/json"
	"fmt"
	"station/pkg/request"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, world", name)
}

func (a *App) SendStationHttpRequest(
	request request.StationHttpRequest,
) {
	fmt.Println("Received request from the station frontend")
	jsonBytes, _ := json.MarshalIndent(request, "", "  ")
	fmt.Println(string(jsonBytes))
}
