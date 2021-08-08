const BASE_URL = "http://localhost:8080";

type ConnectRoomResponse = {
  roomId: "string";
  error: string;
};

type CreateRoomResponse = {
  roomId: "string";
  error: string;
};

type JoinRoomResponse = {
  roomId: "string";
  error: string;
};

type AuthResponse = {
  playerId: "string";
  error: string;
};

export const connectRoom = async (playerId: string) => {
  const response = await fetch(`${BASE_URL}/room/connect?playerId=${playerId}`);
  const data: ConnectRoomResponse = await response.json();
  return { roomId: data?.roomId, err: data?.error };
};

export const createRoom = async (playerId: string) => {
  const response = await fetch(`${BASE_URL}/room/create?playerId=${playerId}`);
  const data: CreateRoomResponse = await response.json();

  return data;
};

export const joinRoom = async ({
  roomId,
  playerId,
}: {
  roomId: string;
  playerId: string;
}) => {
  const response = await fetch(
    `${BASE_URL}/room/join?playerId=${playerId}&roomId=${roomId}`
  );
  const data: JoinRoomResponse = await response.json();

  return data;
};

export const signUp = async () => {
  const response = await fetch(`${BASE_URL}/player/create`);
  const data: AuthResponse = await response.json();
  return data;
};

export const signIn = async (playerId: string) => {
  const response = await fetch(
    `${BASE_URL}/player/register?playerId=${playerId}`
  );
  const data: AuthResponse = await response.json();

  return data;
};
