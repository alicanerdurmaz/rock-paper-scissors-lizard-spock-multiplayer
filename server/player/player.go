package player

import (
	"rpsls/uuid"

	"github.com/gorilla/websocket"
)

type Player struct {
	Id   string          `json:"playerId"`
	Conn *websocket.Conn `json:"-"`
}

type Players struct {
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
		Id:   id,
		Conn: nil,
	}
	p.Add(player)
	return player
}

func (p *Players) RegisterPlayer(id string) *Player {
	player := &Player{
		Id:   id,
		Conn: nil,
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
