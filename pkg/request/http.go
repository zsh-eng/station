package request

import (
	"net/http"
)

// Represents a Http request for the Station API Client
type StationHttpRequest struct {
	Name    string            `json:"name"`
	Method  string            `json:"method"`
	Url     string            `json:"url"`
	Headers map[string]string `json:"headers"`
}

type StationHttpResponse struct {
	StatusCode int         `json:"statusCode"`
	Headers    http.Header `json:"headers"`
	Body       string      `json:"body"`
}
