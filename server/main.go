package main

import (
	"fmt"
	"net/http"
	"os"
	"server/game"
	"server/player"
	"server/room"
	"server/router"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "3000"
	}

	rooms := room.NewRooms()
	players := player.NewPlayers()
	game := game.New(rooms, players)

	createMockData(game)

	router.New(game)

	fmt.Println("Starting server on port", ":"+port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		panic(err)
	}
}

func createMockData(g *game.Game) {
	g.Rooms.TestCreateRoom()
}
