package game

import (
	"rpsls/room"
	"rpsls/util"
	"time"

	"github.com/gorilla/websocket"
)

const (
	RESTART_TIME = 3
)

func (g *Game) Connect(payload *WebSocketPayload, conn *websocket.Conn) {
	player, ok := g.Players.Get(payload.PlayerId)
	if !ok {
		conn.WriteJSON(map[string]string{"command": Error, "message": "something went wrong"})
		return
	}
	player.Conn = conn

	room := g.Rooms.Map[payload.RoomId]
	conn.WriteJSON(map[string]interface{}{"command": Ok, "message": "connected", "room": room})

}

func (g *Game) Play(payload *WebSocketPayload) {
	currentRoom := g.Rooms.Map[payload.RoomId]

	if currentRoom.Status == room.Finished {
		return
	}

	currentRoom.Choices[payload.PlayerId] = payload.Value

	played := g.CheckPlayersDidChoose(payload)
	if played {
		g.FinishGame(currentRoom.Id)
		return
	}

	g.SendRoomStateToAllConnectionsInRoom(currentRoom.Id)
}

func (g *Game) FinishGame(roomId string) {
	g.CalculateWinner(roomId)

	currentRoom := g.Rooms.Map[roomId]
	currentRoom.Status = room.Finished
	g.SendRoomStateToAllConnectionsInRoom(roomId)

	time.Sleep(RESTART_TIME * time.Second)
	g.RestartGame(roomId)
}

func (g *Game) RestartGame(roomId string) {
	currentRoom := g.Rooms.Map[roomId]

	for playerId := range currentRoom.Choices {
		currentRoom.Choices[playerId] = 0
	}
	currentRoom.Winner = ""
	currentRoom.Round += 1
	currentRoom.Status = room.Started

	g.SendRoomStateToAllConnectionsInRoom(roomId)
}

func (g *Game) CheckPlayersDidChoose(payload *WebSocketPayload) bool {
	currentRoom := g.Rooms.Map[payload.RoomId]

	if currentRoom.Status != room.Started {
		return false
	}

	for _, v := range currentRoom.Choices {
		if v == 0 {
			return false
		}
	}

	return true
}

func (g *Game) CalculateWinner(roomId string) {
	currentRoom := g.Rooms.Map[roomId]

	keys := make([]string, 0, len(currentRoom.Choices))
	for k := range currentRoom.Choices {
		keys = append(keys, k)
	}

	firstPlayerId := keys[0]
	secondPlayerId := keys[1]
	firstPlayerChoice := currentRoom.Choices[firstPlayerId]
	secondPlayerChoice := currentRoom.Choices[secondPlayerId]

	if firstPlayerChoice == secondPlayerChoice {
		return
	}

	if util.Includes(ChoiceMap[firstPlayerChoice], secondPlayerChoice) {
		currentRoom.Winner = firstPlayerId
		currentRoom.Scores[firstPlayerId] += 1
	} else {
		currentRoom.Winner = secondPlayerId
		currentRoom.Scores[secondPlayerId] += 1
	}
}

func (p *WebSocketPayload) checkIdIsValid() bool {
	return len(p.RoomId) == 0 || len(p.PlayerId) == 0
}

func GetChoiceString(choice int) string {
	choiceMap := map[int]string{
		Rock:     "Rock",
		Paper:    "Paper",
		Scissors: "Scissors",
		Lizard:   "Lizard",
		Spock:    "Spock",
	}
	return choiceMap[choice]
}
