import { useEffect, useRef, useState } from 'react'
import { usePlayerContext } from '../context/PlayerContext'
import useQuery from '../hooks/useQuery'

enum RoomStatus {
  Waiting = 0,
  Started,
  Finished,
}

enum Choice {
  Null = 0,
  Rock,
  Paper,
  Scissors,
  Lizard,
  Spock,
}

const ChoiceMap = {
  [Choice.Null]: '',
  [Choice.Rock]: 'Rock',
  [Choice.Paper]: 'Paper',
  [Choice.Scissors]: 'Scissors',
  [Choice.Lizard]: 'Lizard',
  [Choice.Spock]: 'Spock',
}

type Player = {
  playerId: string
  status: number
}

type WsResponse = {
  command: string
  message: string
  room: {
    players: Record<string, Player>
    scores: Record<string, number>
    choices: Record<string, number>
    winner: string
    round: number
    roomId: string
    status: RoomStatus
  }
}

const Game = () => {
  const [data, setData] = useState<WsResponse | null>(null)
  const ws = useRef(new WebSocket('ws://localhost:8080/ws'))
  const { player } = usePlayerContext()
  let query = useQuery()

  const playerId = player.playerId
  const roomId = query.get('roomId')

  useEffect(() => {
    ws.current.onopen = function (this: WebSocket, _event: Event) {
      this.send(JSON.stringify({ roomId: roomId, playerId, command: 'connect' }))
    }

    ws.current.onclose = function (this: WebSocket, _event: Event) {
      this.send(JSON.stringify({ roomId: roomId, playerId, command: 'close' }))
    }

    ws.current.onerror = function (event) {
      console.error('WebSocket error observed:', event)
    }

    ws.current.onmessage = function (this: WebSocket, event: MessageEvent) {
      const data: WsResponse = JSON.parse(event.data)
      console.log(data)
      setData(data)
    }
  }, [playerId, query, roomId, ws])

  const play = (value: number) => {
    ws.current.send(JSON.stringify({ roomId: roomId, playerId: playerId, value: value, command: 'play' }))
  }

  if (!data || data?.room?.status === RoomStatus.Waiting) return <h1>Yükleniyor</h1>
  if (data?.command === 'error') return <h1>{data.message}</h1>

  const room = data.room

  const enemyId = Object.keys(room.players).find(playerId => player.playerId !== playerId) as string

  const playerChoice = room.choices[playerId] as Choice
  const enemyChocie = room.choices[enemyId] as Choice

  const winner = room.winner === playerId ? 'YOU' : 'ENEMY'

  console.log('ROOM STATUS : ', RoomStatus[data?.room.status])
  return (
    <div>
      <h1>Round : {room.round} </h1>
      <h2>GAME : {roomId}</h2>
      <h2>Player : {playerId}</h2>

      <button onClick={() => play(Choice.Rock)}>Rock</button>
      <button onClick={() => play(Choice.Paper)}>Paper</button>
      <button onClick={() => play(Choice.Lizard)}>Lizard</button>
      <button onClick={() => play(Choice.Scissors)}>Scissors</button>
      <button onClick={() => play(Choice.Spock)}>Spock</button>
      <br />
      <br />
      <br />
      <h2>
        YOU : {room.scores[playerId]} ENEMY : {room.scores[enemyId]}
      </h2>
      <br />
      <br />
      <br />

      {!!playerChoice ? <h2>YOUR CHOICE : {ChoiceMap[playerChoice]} </h2> : <h2>YOUR CHOICE : THINKING</h2>}

      {!!enemyChocie ? (
        room.status === RoomStatus.Finished ? (
          <h2>ENEMY CHOICE : {ChoiceMap[enemyChocie]}</h2>
        ) : (
          <h2>ENEMY CHOICE : SOMETHING SELECTED</h2>
        )
      ) : (
        <h2>ENEMY CHOICE : THINKING</h2>
      )}

      <br />
      <br />
      <br />
      {room.status === RoomStatus.Finished ? !!room.winner ? <h1>Winner : {winner}</h1> : <h1>ITS A TIE</h1> : null}
    </div>
  )
}

export default Game
