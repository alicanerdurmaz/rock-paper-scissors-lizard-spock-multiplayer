package router

import (
	"net/http"
	"server/game"
)

func New(g *game.Game) {
	http.HandleFunc("/rooms", setupCORS(g.GetAllRooms))
	http.HandleFunc("/room/connect", setupCORS(g.ConnectHandler))
	http.HandleFunc("/room/create", setupCORS(g.CrateRoomHandler))
	http.HandleFunc("/room/join", setupCORS(g.JoinRoomHandler))

	http.HandleFunc("/players", setupCORS(g.GetAllPlayers))
	http.HandleFunc("/player/create", setupCORS(g.CreatePlayerHandler))
	http.HandleFunc("/player/register", setupCORS(g.RegisterPlayerHandler))

	http.HandleFunc("/ws", g.WebSocketHandler)
}

func setupCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
			return
		}

		next(w, r)
	}
}
