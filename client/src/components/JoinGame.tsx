import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'
import useQuery from '../hooks/useQuery'

interface JoinResponse {
  roomId: string
  error: string
}

const JoinGame = () => {
  const history = useHistory()
  const { setPlayer } = usePlayerContext()
  const query = useQuery()

  const playerId = query.get('playerId')
  const roomId = query.get('roomId')

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const response = await fetch(`http://localhost:8080/room/join?roomId=${roomId}&playerId=${playerId}`)
        const data: JoinResponse = await response.json()

        if (response.status !== 200) {
          console.log(data.error)
          return
        }
      } catch (error) {
        console.log(error)
      }

      history.push(`/game?roomId=${roomId}&playerId=${playerId}`)
    }

    joinRoom()
  }, [history, playerId, roomId, setPlayer])

  return (
    <div>
      <h1>{roomId}</h1>
      <h1>{playerId}</h1>
    </div>
  )
}

export default JoinGame
