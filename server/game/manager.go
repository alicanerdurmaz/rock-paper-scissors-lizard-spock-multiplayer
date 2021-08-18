package game

import (
	"rpsls/room"
	"rpsls/util"
	"time"

	"github.com/gorilla/websocket"
)

const (
	WAIT_BEFORE_RESTART = 2000
)

func (g *Game) Connect(payload *WebSocketPayload, conn *websocket.Conn) {
	g.Rooms.RWMutex.Lock()
	defer g.Rooms.RWMutex.Unlock()

	player, ok := g.Rooms.Map[payload.RoomId].Players[payload.PlayerId]
	if !ok {
		conn.WriteJSON(map[string]string{"command": Error, "message": "something went wrong"})
		return
	}

	player.Conn = conn

	room := g.Rooms.Map[payload.RoomId]
	conn.WriteJSON(map[string]interface{}{"command": Ok, "message": "connected", "room": room})

}

func (g *Game) Play(payload *WebSocketPayload) {
	g.Rooms.RWMutex.Lock()
	defer g.Rooms.RWMutex.Unlock()

	roomId := payload.RoomId
	currentRoom := g.Rooms.Map[roomId]
	playerId := payload.PlayerId

	if currentRoom.Status == room.Finished {
		return
	}

	currentRoom.Choices[playerId] = payload.Value

	played := checkPlayersDidChoose(currentRoom)
	if played {
		calculateWinner(currentRoom)
		finishGame(currentRoom)

		time.Sleep(time.Duration(WAIT_BEFORE_RESTART) * time.Millisecond)
		restartGame(currentRoom)
		return
	}

	SendRoomStateToAllConnectionsInRoom(currentRoom)
}

func finishGame(currentRoom *room.Room) {
	currentRoom.Status = room.Finished
	SendRoomStateToAllConnectionsInRoom(currentRoom)

}

func restartGame(currentRoom *room.Room) {
	for playerId := range currentRoom.Choices {
		currentRoom.Choices[playerId] = Null
	}

	currentRoom.Winner = ""
	currentRoom.Round += 1
	currentRoom.Status = room.Started
	SendRoomStateToAllConnectionsInRoom(currentRoom)
}

func checkPlayersDidChoose(currentRoom *room.Room) bool {
	if currentRoom.Status != room.Started {
		return false
	}

	for _, v := range currentRoom.Choices {
		if v == Null {
			return false
		}
	}

	return true
}

func calculateWinner(currentRoom *room.Room) {
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
