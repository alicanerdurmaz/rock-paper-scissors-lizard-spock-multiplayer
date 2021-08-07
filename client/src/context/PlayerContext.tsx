import { useState, createContext, useContext, useCallback, useMemo, useEffect } from 'react'
import { api, buildQuery } from '../utils/api'

export type IPlayer = {
  playerId: string
}

interface IPlayerContext {
  player: IPlayer
  loading: boolean
  setPlayer: (player: IPlayer) => void
}

const PlayerContext = createContext<IPlayerContext | undefined>(undefined)

export const PlayerProvider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<IPlayer | null>(null)
  const [loading, setLoading] = useState(false)

  const setPlayer = useCallback((player: IPlayer) => {
    setPlayerState(player)
  }, [])

  console.log(playerState)

  useEffect(() => {
    if (playerState) return

    setLoading(true)

    const player = localStorage.getItem('player')

    if (player) {
      const { playerId } = JSON.parse(player)

      fetch(buildQuery(api.registerPlayer, { playerId: playerId }))
        .then(response => response.json())
        .then(data => {
          setPlayer(data)
        })
        .finally(() => {
          setLoading(false)
        })
      return
    }

    console.log('createPlayer')
    fetch(api.createPlayer)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('player', JSON.stringify(data))
        setPlayer(data)
      })
      .finally(() => setLoading(false))
  }, [playerState, setPlayer])

  const value = {
    player: playerState as IPlayer,
    setPlayer,
    loading,
  }
  return (
    <PlayerContext.Provider value={value}>
      {playerState ? children : <div>player undefined</div>}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = () => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a UserContextProvider')
  }
  return context
}
