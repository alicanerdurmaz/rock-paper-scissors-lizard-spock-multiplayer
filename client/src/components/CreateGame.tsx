import { useHistory } from 'react-router-dom'

type Room = {
  gameId: string
  message: string
}

const CreateGame = () => {
  const history = useHistory()

  const createRoomHandler = async () => {
    const response = await fetch(`http://localhost:8080/create`)

    if (response.status !== 200) return

    const { gameId }: Room = await response.json()

    history.push(`/join/${gameId}`)
  }
  return (
    <div>
      <button onClick={createRoomHandler}>create game</button>
    </div>
  )
}

export default CreateGame
