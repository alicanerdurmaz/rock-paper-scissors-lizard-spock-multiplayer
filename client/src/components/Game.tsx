import { useEffect, useRef, useState } from 'react'
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
  room: {
    players: Player[]
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
  let query = useQuery()

  const playerId = query.get('playerId') as string

  useEffect(() => {
    ws.current.onopen = function (this: WebSocket, _event: Event) {
      this.send(JSON.stringify({ roomId: query.get('roomId'), playerId: query.get('playerId'), command: 'connect' }))
    }

    ws.current.onclose = function (this: WebSocket, _event: Event) {
      this.send(JSON.stringify({ roomId: query.get('roomId'), playerId: query.get('playerId'), command: 'close' }))
    }

    ws.current.onerror = function (event) {
      console.error('WebSocket error observed:', event)
    }

    ws.current.onmessage = function (this: WebSocket, event: MessageEvent) {
      const data: WsResponse = JSON.parse(event.data)
      console.log(data)
      setData(data)
    }
  }, [query, ws])

  const play = (value: number) => {
    ws.current.send(
      JSON.stringify({ roomId: query.get('roomId'), playerId: query.get('playerId'), value: value, command: 'play' }),
    )
  }

  if (!data) return <h1>Yükleniyor</h1>

  const room = data.room
  const enemy = room.players.find(player => player.playerId !== playerId) as Player

  const playerChoice = room.choices[playerId] as Choice
  const enemyChocie = room.choices[enemy.playerId] as Choice

  const winner = room.winner === playerId ? 'YOU' : 'ENEMY'

  return (
    <div>
      <h1>Round : {room.round} </h1>
      <h2>GAME : {query.get('roomId')}</h2>
      <h2>Player : {query.get('playerId')}</h2>

      <button onClick={() => play(Choice.Rock)}>Rock</button>
      <button onClick={() => play(Choice.Paper)}>Paper</button>
      <button onClick={() => play(Choice.Lizard)}>Lizard</button>
      <button onClick={() => play(Choice.Scissors)}>Scissors</button>
      <button onClick={() => play(Choice.Spock)}>Spock</button>
      <br />
      <br />
      <br />
      <h2>
        YOU : {room.scores[playerId]} ENEMY : {room.scores[enemy.playerId]}
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
