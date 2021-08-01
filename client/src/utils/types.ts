import { IPlayer } from '../context/PlayerContext'

enum RoomStatus {
  Waiting,
  Ready,
  Finished,
}

export type Room = {
  GAME_SIZE: number
  roomId: string
  players: Record<string, IPlayer>[]
  status: RoomStatus
}
