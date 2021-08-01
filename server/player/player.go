package player

import (
	"rpsls/uuid"
	"sync"

	"github.com/gorilla/websocket"
)

type Player struct {
	Id     string          `json:"playerId"`
	Status int             `json:"status"`
	Conn   *websocket.Conn `json:"conn"`
}

type Players struct {
	sync.RWMutex
	Map map[string]*Player `json:"list"`
}

func NewPlayers() *Players {
	return &Players{
		Map: make(map[string]*Player),
	}
}

func (p *Players) NewPlayer() *Player {
	id, _ := uuid.New()
	player := &Player{
		Id:     id,
		Status: 0,
		Conn:   nil,
	}
	p.Add(player)
	return player
}

func (p *Players) RegisterPlayer(id string) *Player {
	player := &Player{
		Id:     id,
		Status: 0,
		Conn:   nil,
	}
	p.Add(player)
	return player
}

func (p *Players) Add(player *Player) *Player {
	p.Map[player.Id] = player
	return player
}

func (p *Players) Get(playerId string) (*Player, bool) {
	player, ok := p.Map[playerId]
	return player, ok
}

func (p *Players) GetAll() map[string]*Player {
	return p.Map
}
