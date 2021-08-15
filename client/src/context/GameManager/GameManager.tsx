import { useRouter } from "next/dist/client/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ShareRoom from "../../components/ShareRoom";
import Spinner from "../../components/Spinner";
import { usePlayerContext } from "../PlayerContext";
import { Commands, WsResponse } from "./types";

type Room = WsResponse["room"];

interface IGameManagerContext {
  roomState: Room;
  ws: WebSocket;
  enemyId: string | null;
  playerId: string;
}

const GameManager = createContext<IGameManagerContext | undefined>(undefined);

export const GameManagerProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const { player } = usePlayerContext();
  const [roomState, setRoomState] = useState<Room | null>(null);
  const [ws] = useState(() => new WebSocket("ws://localhost:8080/ws"));

  const playerId = player.playerId;

  const enemyId =
    Object.keys(roomState?.players || {}).find((id) => id !== playerId) || null;

  const roomId = router.query.roomId;

  useEffect(() => {
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
      setRoomState(data.room);
    };
  }, [playerId, roomId, ws]);

  const value = {
    roomState: roomState as Room,
    ws,
    enemyId,
    playerId,
  };

  console.log(roomState);
  return (
    <GameManager.Provider value={value}>
      {roomState?.status === 0 && <ShareRoom />}
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
