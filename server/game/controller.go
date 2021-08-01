package game

import (
	"net/http"
	"rpsls/util"
)

func (g *Game) CrateRoomHandler(w http.ResponseWriter, req *http.Request) {
	roomId, err := g.Rooms.CreateRoom()
	if err != nil {
		util.RespondWithError(w, http.StatusNotFound, err.Error())
		return
	}

	util.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"roomId": roomId})
}

func (g *Game) JoinRoomHandler(w http.ResponseWriter, req *http.Request) {
	playerId := req.URL.Query().Get("playerId")
	player, ok := g.Players.Get(playerId)
	if !ok {
		util.RespondWithError(w, http.StatusNotFound, "Player ID not found")
		return
	}

	roomId := req.URL.Query().Get("roomId")

	err := g.Rooms.JoinRoom(roomId, player)
	if err != nil {
		util.RespondWithError(w, http.StatusNotFound, err.Error())
		return
	}

	util.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"roomId": roomId})
}

func (g *Game) CreatePlayerHandler(w http.ResponseWriter, r *http.Request) {
	player := g.Players.NewPlayer()

	util.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"playerId": player.Id})
}

func (g *Game) RegisterPlayerHandler(w http.ResponseWriter, r *http.Request) {
	playerId := r.URL.Query().Get("id")
	g.Players.RegisterPlayer(playerId)

	util.RespondWithJSON(w, http.StatusOK, map[string]interface{}{"playerId": playerId})
}

func (g *Game) GetAllRooms(w http.ResponseWriter, req *http.Request) {
	util.RespondWithJSON(w, http.StatusOK, g.Rooms.GetAll())
}

func (g *Game) GetAllPlayers(w http.ResponseWriter, req *http.Request) {
	util.RespondWithJSON(w, http.StatusOK, g.Players.GetAll())
}
