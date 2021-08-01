package room

const GameSize = 2

func (r *Rooms) CheckRoomIsExist(roomId string) bool {
	_, ok := r.Map[roomId]
	return ok
}

func (r *Rooms) CheckGameIsFull(roomId string) bool {
	return GameSize == len(r.Map[roomId].Players)
}

func (r *Rooms) CheckPlayerIsInRoom(roomId string, playerId string) bool {
	for _, player := range r.Map[roomId].Players {
		if player.Id == playerId {
			return true
		}
	}
	return false
}
