import Game from "../src/components/Game";
import { GameManagerProvider } from "../src/context/GameManager";

const GamePage = () => {
  return (
    <GameManagerProvider>
      <Game />
    </GameManagerProvider>
  );
};

export default GamePage;
