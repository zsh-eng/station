package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type DB struct {
	*sql.DB
}

const (
	DbFilename = "database.db"
)

func NewDB() (*DB, error) {
	db, err := sql.Open("sqlite3", DbFilename)
	if err != nil {
		return nil, err
	}
	return &DB{db}, nil
}
