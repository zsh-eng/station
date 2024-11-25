package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"
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
	req request.StationHttpRequest,
) (*request.StationHttpResponse, error) {
	// how to use enums
	// how to do logging in go?

	fmt.Println("Received request from the station frontend")
	// input validation and returning the appropriate errors
	// better input validation on the client side as well

	// catching errors and returning them to the frontend
	// support more methods
	// support various input types
	// show various output results  and better representation for the headers
	// handle bearer auth
	// handle web socket connections
	// named collections
	// history for the request / response (database)
	// cmd k search
	switch req.Method {
	case "GET":
		resp, err := http.Get(req.Url)
		if err != nil {
			log.Fatal(err)
		}

		defer resp.Body.Close()
		statusCode := resp.StatusCode
		headers := resp.Header
		bodyBytes, err := io.ReadAll(resp.Body)
		bodyString := string(bodyBytes)

		return &request.StationHttpResponse{
			StatusCode: statusCode,
			Headers:    headers,
			Body:       bodyString,
		}, nil
	case "POST":
	default:
		fmt.Println("Unrecognised method: %s", req.Method)
	}

	// how does wails handle errors
	return nil, fmt.Errorf("Error")
}
