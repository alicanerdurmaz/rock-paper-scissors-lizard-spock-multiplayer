package game

import (
	"rpsls/player"
	"rpsls/room"
)

// choice values
//	- `Null` : 0
//	- `Rock` : 1
//	- `Paper` : 2
//	- `Scissors` : 3
//	- `Lizard` : 4
//	- `Spock` : 5
const (
	Null int = iota
	Rock
	Paper
	Scissors
	Lizard
	Spock
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
