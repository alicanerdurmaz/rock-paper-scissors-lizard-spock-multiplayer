package game

import (
	"rpsls/player"
	"rpsls/room"
)

// choice values
//	- `Null` : -1
//	- `Rock` : 0
//	- `Paper` : 1
//	- `Scissors` : 2
//	- `Lizard` : 3
//	- `Spock` : 4
const (
	Null     = -1
	Rock     = 0
	Paper    = 1
	Scissors = 2
	Lizard   = 3
	Spock    = 4
)

// which values to dominate.
//	- ChoiceMap[Rock] returns -> [Scissors, Lizard]
//rock dominates to Scissor and Lizard
var ChoiceMap = map[int][]int{
	Rock:     {Scissors, Lizard},
	Paper:    {Rock, Spock},
	Scissors: {Paper, Lizard},
	Lizard:   {Paper, Spock},
	Spock:    {Scissors, Rock},
}

type Game struct {
	Players *player.Players
	Rooms   *room.Rooms
}

func New(r *room.Rooms, p *player.Players) *Game {
	return &Game{
		Rooms:   r,
		Players: p,
	}
}
