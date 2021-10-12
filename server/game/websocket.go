package game

import (
	"log"
	"net/http"
	"server/room"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

const (
	Connect = "connect"
	Play    = "play"
	Ok      = "ok"
	Close   = "close"
	Error   = "error"
)

type WebSocketPayload struct {
	PlayerId string `json:"playerId,omitempty"`
	RoomId   string `json:"roomId,omitempty"`
	Value    int    `json:"value,omitempty"`
	Command  string `json:"command,omitempty"`
}

func (g *Game) WebSocketHandler(w http.ResponseWriter, req *http.Request) {

	conn, err := upgrader.Upgrade(w, req, nil)
	if err != nil {
		log.Println("Error upgrader conn.", err)
		conn.Close()
		return
	}

	defer conn.Close()
	conn.SetCloseHandler(func(code int, text string) error {
		conn.Close()
		return nil
	})

	for {

		payload := &WebSocketPayload{}
		err = conn.ReadJSON(payload)

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("IsUnexpectedCloseError()", err)
			}
			return
		}

		roomId := payload.RoomId
		playerId := payload.PlayerId
		room := g.Rooms.Map[roomId]

		if payload.checkIdIsValid() {
			conn.WriteJSON(map[string]string{"command": Error, "message": "Room ID or Player ID is invalid"})
			return
		}

		if !g.Rooms.CheckPlayerIsInRoom(roomId, playerId) {
			conn.WriteJSON(map[string]string{"command": Error, "message": "room is full or you not authorized to join"})
			return
		}

		log.Printf("%+v\n", payload)

		switch payload.Command {
		case Connect:
			g.Connect(payload, conn)
			SendRoomStateToAllConnectionsInRoom(room)
		case Play:
			g.Play(payload)
		default:
			conn.WriteJSON(map[string]string{"command": Error, "message": "something went wrong"})
		}

	}
}

func SendToAllConnectionsInRoom(room *room.Room, payload map[string]interface{}) {
	for _, p := range room.Players {
		p.Conn.WriteJSON(payload)
	}
}

func SendRoomStateToAllConnectionsInRoom(room *room.Room) {
	for _, p := range room.Players {
		p.Conn.WriteJSON(map[string]interface{}{"command": Ok, "room": room})
	}
}
