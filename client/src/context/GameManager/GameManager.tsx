import { useRouter } from "next/dist/client/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import ShareRoom from "../../components/ShareRoom";
import Spinner from "../../components/Spinner";
import { usePlayerContext } from "../PlayerContext";
import { Commands, WsResponse } from "./types";

interface IGameManagerContext {
  roomState: WsResponse;
}

const GameManager = createContext<IGameManagerContext | undefined>(undefined);

export const GameManagerProvider: React.FC = ({ children }) => {
  const { player } = usePlayerContext();
  const [roomState, setRoomState] = useState<WsResponse | null>(null);
  const router = useRouter();

  const playerId = player.playerId;
  const roomId = router.query.roomId;

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
      setRoomState(data);
    };
  }, [playerId, roomId]);

  const value = {
    roomState: roomState as WsResponse,
  };

  console.log(roomState?.room?.status);
  return (
    <GameManager.Provider value={value}>
      {roomState?.room?.status === 0 && <ShareRoom />}
      {!roomState ? <Spinner /> : children}
    </GameManager.Provider>
  );
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
