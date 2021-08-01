import { useState, createContext, useContext, useCallback, useMemo } from 'react'

export type IPlayer = {
  playerId: string
}

interface IPlayerContext {
  player: IPlayer | null
  setPlayer: (player: IPlayer) => void
}

const PlayerContext = createContext<IPlayerContext | undefined>(undefined)

export const PlayerProvider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<IPlayer | null>(null)

  const setPlayer = useCallback((player: IPlayer) => {
    setPlayerState(player)
  }, [])

  const player = useMemo(() => playerState, [playerState])

  return <PlayerContext.Provider value={{ player, setPlayer }}>{children}</PlayerContext.Provider>
}

export const usePlayerContext = () => {
  const context = useContext(PlayerContext)
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a UserContextProvider')
  }
  return context
}
