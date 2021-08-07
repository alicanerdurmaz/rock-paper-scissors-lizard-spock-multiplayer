import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import useQuery from '../hooks/useQuery'
import { api, buildQuery } from '../utils/api'
import { routes } from '../utils/routes'

interface JoinResponse {
  roomId: string
  error: string
}

const JoinGame = () => {
  const history = useHistory()
  const { player } = usePlayerContext()
  const query = useQuery()

  const roomId = query.get('roomId')

  useEffect(() => {
    const joinRoom = async () => {
      try {
        if (!player || !roomId) return

        const url = buildQuery(api.joinRoom, { roomId: roomId, playerId: player.playerId })
        const response = await fetch(url)
        const data: JoinResponse = await response.json()

        if (response.status !== 200) {
          console.log(data.error)
          return
        }

        history.push(buildQuery(routes.game, { roomId: roomId }))
      } catch (error) {
        console.log(error)
      }
    }

    joinRoom()
  }, [history, roomId, player])

  return (
    <div>
      <h1>{roomId}</h1>
      <h1>{player?.playerId}</h1>
    </div>
  )
}

export default JoinGame
