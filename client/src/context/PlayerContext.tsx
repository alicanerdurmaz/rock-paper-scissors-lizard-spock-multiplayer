import React, {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { signIn, signUp } from "../api/api";
import Spinner from "../components/Spinner";

export type IPlayer = {
  playerId: string;
};

interface IPlayerContext {
  player: IPlayer;
  loading: boolean;
  setPlayer: (player: IPlayer) => void;
}

const PlayerContext = createContext<IPlayerContext | undefined>(undefined);

export const PlayerProvider: React.FC = ({ children }) => {
  const [playerState, setPlayerState] = useState<IPlayer | null>(null);
  const [loading, setLoading] = useState(true);

  const setPlayer = useCallback((player: IPlayer) => {
    setPlayerState(player);
  }, []);

  const signInHandler = useCallback(
    async (playerId: string) => {
      const player = await signIn(playerId);
      setPlayer(player);
    },
    [setPlayer]
  );

  const signUpHandler = useCallback(async () => {
    const player = await signUp();
    localStorage.setItem("player", JSON.stringify(player));
    setPlayer(player);
  }, [setPlayer]);

  useEffect(() => {
    if (playerState) return;
    setLoading(true);

    const player = localStorage.getItem("player");

    if (player) {
      const { playerId } = JSON.parse(player);
      signInHandler(playerId).then(() => {
        setLoading(false);
      });
      return;
    }

    signUpHandler().then(() => {
      setLoading(false);
    });
  }, [playerState, setPlayer, signInHandler, signUpHandler]);

  const value = {
    player: playerState as IPlayer,
    setPlayer,
    loading,
  };

  return (
    <PlayerContext.Provider value={value}>
      {playerState ? children : <Spinner />}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error(
      "usePlayerContext must be used within a UserContextProvider"
    );
  }
  return context;
};
