package main

import (
	"fmt"
	"log"
	"net/http"
	"rpsls/game"
	"rpsls/player"
	"rpsls/room"
	"rpsls/router"
)

func main() {
	port := ":8080"

	rooms := room.NewRooms()
	players := player.NewPlayers()
	game := game.New(rooms, players)
	createMockData(game)
	router.New(game)

	fmt.Println("Starting server on port", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func createMockData(g *game.Game) {
	g.Rooms.TestCreateRoom()

}
