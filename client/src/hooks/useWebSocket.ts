const ws =
  typeof window !== "undefined"
    ? new WebSocket("ws://localhost:8080/ws")
    : null;

const useWebSocket = () => {
  return null;
};

export default useWebSocket;
