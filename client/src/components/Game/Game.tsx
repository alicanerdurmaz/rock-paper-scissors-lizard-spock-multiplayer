import { useGameManager } from "../../context/GameManager";
import { RoomStatus } from "../../context/GameManager/types";
import Choices from "../Choice";
import Scores from "../Scores";
import Winner from "../Winner";

const Game = () => {
  const { roomState } = useGameManager();

  return (
    <div className="max-w-7xl mx-auto px-8">
      <Scores />
      {roomState.status === RoomStatus.Started && <Choices className="mt-8" />}
      {roomState.status === RoomStatus.Finished && <Winner className="mt-8" />}
    </div>
  );
};

export default Game;
