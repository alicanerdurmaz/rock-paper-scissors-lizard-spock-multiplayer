import { FC } from "react";
import cx from "classnames";
import { useGameManager } from "../../context/GameManager";
import { usePlayerContext } from "../../context/PlayerContext";
import { Choice, RoomStatus } from "../../context/GameManager/types";

interface ScoresProps {
  className?: string;
}

const ScoreText = ({
  label,
  labelColor,
  value,
}: {
  label: string;
  labelColor: string;
  value: number;
}) => {
  return (
    <div className="text-center font-bold">
      <div className={cx("text-2xl", labelColor)}>{label}</div>
      <div className="text-4xl text-blueGray-800"> {value}</div>
    </div>
  );
};

const Scores: FC<ScoresProps> = ({ className }) => {
  const { player } = usePlayerContext();
  const { roomState, enemyId } = useGameManager();

  const playerId = player.playerId;

  const scores = roomState.scores;

  const didEnemyPlayed =
    enemyId &&
    roomState.status === RoomStatus.Started &&
    roomState.choices[enemyId] !== Choice.Null;

  return (
    <div className={cx("flex justify-between", className)}>
      <ScoreText
        label="YOU"
        value={scores[playerId]}
        labelColor="text-blueGray-600"
      />
      <div>
        <ScoreText
          label="THEM"
          value={enemyId ? scores[enemyId] : 0}
          labelColor="text-red-800"
        />
        <h3
          className={cx(
            "text-coolGray-500 italic text-sm",
            didEnemyPlayed ? "visible" : "invisible"
          )}
        >
          they selected
        </h3>
      </div>
    </div>
  );
};

export default Scores;
