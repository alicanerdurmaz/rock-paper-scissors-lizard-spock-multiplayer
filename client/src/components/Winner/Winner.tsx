import { FC } from "react";
import cx from "classnames";
import { useGameManager } from "../../context/GameManager";
import ChoiceIcon from "../Choice/ChoiceIcon";
import { ChoiceName } from "../../context/GameManager/types";

interface WinnerProps {
  className?: string;
}

const Winner: FC<WinnerProps> = ({ className }) => {
  const { roomState, playerId, enemyId } = useGameManager();

  const result = !roomState.winner
    ? { className: "text-sky-500", text: "YOU TIE" }
    : roomState.winner === playerId
    ? { className: "text-emerald-500", text: "YOU WIN" }
    : { className: "text-rose-500", text: "YOU LOSE" };

  const playerChoice = roomState.choices[playerId];
  const enemyChoice = roomState.choices[enemyId || ""];

  return (
    <div
      className={cx(
        "flex flex-col md:flex-row justify-between items-center text-center",
        className
      )}
    >
      <div className="flex items-center justify-center flex-col">
        <ChoiceIcon name={playerChoice} />
        <div className="mt-2 text-l md:text-2xl">
          you choose {ChoiceName[playerChoice]}
        </div>
      </div>

      <h2
        className={cx(
          result.className,
          "my-12 md:mx-24 md:my-0 text-4xl font-bold"
        )}
      >
        {result.text}
      </h2>

      <div className="flex items-center justify-center flex-col">
        <ChoiceIcon name={enemyChoice} />
        <div className="mt-2 text-l md:text-2xl">
          their choose {ChoiceName[enemyChoice]}
        </div>
      </div>
    </div>
  );
};

export default Winner;
