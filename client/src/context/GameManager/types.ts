import { IPlayer } from "../PlayerContext";

export enum RoomStatus {
  Waiting = 0,
  Started,
  Finished,
}

export enum Choice {
  Null = 0,
  Rock,
  Paper,
  Scissors,
  Lizard,
  Spock,
}

export const ChoiceMap = {
  [Choice.Null]: "",
  [Choice.Rock]: "Rock",
  [Choice.Paper]: "Paper",
  [Choice.Scissors]: "Scissors",
  [Choice.Lizard]: "Lizard",
  [Choice.Spock]: "Spock",
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
    choices: Record<string, number>;
    winner: string;
    round: number;
    roomId: string;
    status: RoomStatus;
  };
};
