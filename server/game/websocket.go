package game

import (
	"log"
	"net/http"

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

	for {
		payload := &WebSocketPayload{}
		err = conn.ReadJSON(payload)
		if err != nil {
			if websocket.IsCloseError(err, websocket.CloseGoingAway) {
				log.Println("IsCloseError()", err, conn.RemoteAddr().String())
			}
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Println("IsUnexpectedCloseError()", err)
			}
			return
		}

		if payload.checkIdIsValid() {
			conn.WriteJSON(map[string]string{"command": Error, "message": "Room ID or Player ID is invalid"})
			return
		}

		if !g.Rooms.CheckPlayerIsInRoom(payload.RoomId, payload.PlayerId) {
			conn.WriteJSON(map[string]string{"command": Error, "message": "room is full or you not authorized to join"})
			return
		}

		log.Printf("%+v\n", payload)

		switch payload.Command {
		case Connect:
			g.Connect(payload, conn)
			g.SendRoomStateToAllConnectionsInRoom(payload.RoomId)
		case Play:
			g.Play(payload)
			g.SendRoomStateToAllConnectionsInRoom(payload.RoomId)
		default:
			conn.WriteJSON(map[string]string{"command": Error, "message": "something went wrong"})

		}

	}
}

func (g *Game) SendToAllConnectionsInRoom(roomId string, payload map[string]interface{}) {
	room := g.Rooms.Map[roomId]
	for _, p := range room.Players {
		p.Conn.WriteJSON(payload)
	}
}

func (g *Game) SendRoomStateToAllConnectionsInRoom(roomId string) {
	room := g.Rooms.Map[roomId]

	for _, p := range room.Players {
		println("SendRoomStateToAllConnectionsInRoom : -> ", p.Conn.RemoteAddr().String())
		p.Conn.WriteJSON(map[string]interface{}{"command": Ok, "room": room})
	}

}
