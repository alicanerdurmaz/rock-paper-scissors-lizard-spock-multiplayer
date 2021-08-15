import { IPlayer } from "../PlayerContext";

export enum RoomStatus {
  Waiting = 0,
  Started,
  Finished,
}

export enum Choice {
  Null = -1,
  Rock,
  Paper,
  Scissors,
  Lizard,
  Spock,
}

export const ChoiceName = {
  [Choice.Null]: "",
  [Choice.Rock]: "rock",
  [Choice.Paper]: "paper",
  [Choice.Scissors]: "scissors",
  [Choice.Lizard]: "lizard",
  [Choice.Spock]: "spock",
};

export const Commands = {
  connect: "connect",
  play: "play",
  close: "close",
};

export type WsResponse = {
  command: keyof typeof Commands;
  message: string;
  room: {
    players: Record<string, IPlayer>;
    scores: Record<string, number>;
    choices: Record<string, Choice>;
    winner: string;
    round: number;
    roomId: string;
    status: RoomStatus;
  };
};
