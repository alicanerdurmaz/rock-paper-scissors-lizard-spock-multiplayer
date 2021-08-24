package main

import (
	"fmt"
	"net/http"
	"os"
	"rpsls/game"
	"rpsls/player"
	"rpsls/room"
	"rpsls/router"
)

func main() {
	port := ":" + os.Getenv("PORT")

	rooms := room.NewRooms()
	players := player.NewPlayers()
	game := game.New(rooms, players)

	createMockData(game)

	router.New(game)

	fmt.Println("Starting server on port", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		panic(err)
	}
}

func createMockData(g *game.Game) {
	g.Rooms.TestCreateRoom()
}
