package room

import (
	"errors"
	"rpsls/player"
	"rpsls/uuid"
	"sync"
)

// room status
const (
	Waiting = iota
	Started
	Finished
)

type Room struct {
	Players map[string]*player.Player `json:"players"`
	Scores  map[string]int            `json:"scores"`
	Choices map[string]int            `json:"choices"`
	Winner  string                    `json:"winner"`
	Round   int                       `json:"round"`
	Id      string                    `json:"roomId"`
	Status  int                       `json:"status"`
}

type Rooms struct {
	sync.RWMutex
	Map map[string]*Room `json:"rooms"`
}

func NewRooms() *Rooms {
	return &Rooms{
		Map: make(map[string]*Room),
	}
}

func (r *Rooms) CreateRoom() (string, error) {
	r.Lock()
	defer r.Unlock()

	roomId, err := uuid.New()
	if err != nil {
		return "", errors.New("something went wrong when creating room id")
	}

	if r.CheckRoomIsExist(roomId) {
		return roomId, errors.New("room ID not available, try again")
	}

	r.Map[roomId] = &Room{Id: roomId, Status: Waiting}
	r.Map[roomId].Players = make(map[string]*player.Player)
	r.Map[roomId].Scores = make(map[string]int)
	r.Map[roomId].Choices = make(map[string]int)
	r.Map[roomId].Round = 1

	return roomId, nil
}

func (r *Rooms) JoinRoom(roomId string, player *player.Player) error {
	r.Lock()
	defer r.Unlock()

	if !r.CheckRoomIsExist(roomId) {
		return errors.New("room not exist")
	}

	isJoined := r.CheckPlayerIsInRoom(roomId, player.Id)
	if isJoined {
		return nil
	}

	isFull := r.CheckGameIsFull(roomId)
	if isFull {
		return errors.New("room is full")
	}

	r.Map[roomId].AddPlayer(player)

	isFull = r.CheckGameIsFull(roomId)
	if isFull {
		r.Map[roomId].Status = Started
	}

	return nil
}

func (r *Rooms) GetAll() map[string]*Room {
	return r.Map
}

func (r *Room) AddPlayer(player *player.Player) {
	r.Players[player.Id] = player
	r.Scores[player.Id] = 0
	r.Choices[player.Id] = 0
}

func (r *Rooms) TestCreateRoom() {
	r.Lock()
	defer r.Unlock()

	r.Map["1"] = &Room{Id: "1", Status: Waiting}
	r.Map["1"].Players = make(map[string]*player.Player)
	r.Map["1"].Scores = make(map[string]int)
	r.Map["1"].Choices = make(map[string]int)
}
