import { useRouter } from "next/dist/client/router";
import { createContext, useContext, useEffect, useRef } from "react";
import { usePlayerContext } from "../PlayerContext";
import { Commands, WsResponse } from "./types";

interface IGameManagerContext {}

const GameManager = createContext<IGameManagerContext | undefined>(undefined);

export const GameManagerProvider: React.FC = ({ children }) => {
  const { player } = usePlayerContext();
  const router = useRouter();

  const playerId = player.playerId;
  const roomId = router.asPath.substring(1);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = function (this: WebSocket, _event: Event) {
      this.send(
        JSON.stringify({ roomId: roomId, playerId, command: Commands.connect })
      );
    };

    ws.onclose = function (this: WebSocket, _event: Event) {
      this.send(
        JSON.stringify({ roomId: roomId, playerId, command: Commands.close })
      );
    };

    ws.onerror = function (event) {
      console.error("WebSocket error observed:", event);
    };

    ws.onmessage = function (this: WebSocket, event: MessageEvent) {
      const data: WsResponse = JSON.parse(event.data);
      console.log(data);
    };
  }, [playerId, roomId]);

  return <GameManager.Provider value={{}}>{children}</GameManager.Provider>;
};

export const useGameManager = () => {
  const context = useContext(GameManager);

  if (context === undefined) {
    throw new Error(
      "usePlayerContext must be used within a GameManagerProvider"
    );
  }
  return context;
};
