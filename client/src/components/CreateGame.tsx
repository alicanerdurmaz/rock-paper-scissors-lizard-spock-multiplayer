import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { api, buildQuery } from '../utils/api'
import { routes } from '../utils/routes'

type Room = {
  roomId: string
  message: string
}

const CreateGame = () => {
  const history = useHistory()
  const [roomId, setRoomId] = useState('')

  const createRoomHandler = async () => {
    const response = await fetch(api.createRoom)
    if (response.status !== 200) return

    const { roomId }: Room = await response.json()

    history.push(buildQuery(routes.joinRoom, { roomId: roomId }))
  }

  const joinRoomHandler = () => {
    history.push(buildQuery(routes.joinRoom, { roomId: roomId }))
  }

  return (
    <div>
      <button onClick={createRoomHandler}>create game</button>

      <br />
      <br />
      <br />
      <input value={roomId} onChange={e => setRoomId(e.target.value)}></input>
      <button onClick={joinRoomHandler}>join game</button>
    </div>
  )
}

export default CreateGame
