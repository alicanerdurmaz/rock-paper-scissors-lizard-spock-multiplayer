import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import { useGameManager } from "../../context/GameManager";
import { Choice, RoomStatus } from "../../context/GameManager/types";
import Choices from "../Choice";
import PlayerDidChoose from "../Choice/PlayerDidChoose";
import Scores from "../Scores";
import Winner from "../Winner";

const Game = () => {
  const { roomState, playerId } = useGameManager();

  const playerChoice = roomState.choices[playerId];
  const playerDidChoose = playerChoice !== Choice.Null;

  const showChoices =
    !playerDidChoose && roomState.status === RoomStatus.Started;

  const showPlayerDidChoose =
    playerDidChoose && roomState.status !== RoomStatus.Finished;

  const showWinner = roomState.status === RoomStatus.Finished;

  return (
    <div className="max-w-7xl mx-auto px-8">
      <Scores />
      <AnimatePresence exitBeforeEnter>
        {showChoices && (
          <motion.div
            key="choices"
            transition={{
              x: {
                velocity: 5,
                type: "spring",
                stiffness: 600,
                damping: 100,
                duration: 0.1,
              },
              opacity: { duration: 0.6 },
            }}
            initial={{ x: 300, opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <Choices className="mt-8" />
          </motion.div>
        )}

        {showPlayerDidChoose && (
          <motion.div
            key="playerDidChoose"
            transition={{
              opacity: { duration: 0.2 },
            }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PlayerDidChoose playerChoice={playerChoice} />
          </motion.div>
        )}

        {showWinner && <Winner className="mt-8" />}
      </AnimatePresence>
    </div>
  );
};

export default Game;
