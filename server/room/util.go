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
	_, ok := r.Map[roomId].Players[playerId]
	return ok
}
