import { FC } from "react";
import cx from "classnames";
import { useGameManager } from "../../context/GameManager";

interface WinnerProps {
  className?: string;
}

const Winner: FC<WinnerProps> = ({ className }) => {
  const { roomState, playerId } = useGameManager();

  const result = !roomState.winner
    ? { className: "text-cyan-700", text: "YOU TIE" }
    : roomState.winner === playerId
    ? { className: "text-green-700", text: "YOU WIN" }
    : { className: "text-red-700", text: "YOU LOSE" };

  return (
    <div className={cx("text-center text-4xl font-bold", className)}>
      <h2 className={cx(result.className, "")}>{result.text}</h2>
    </div>
  );
};

export default Winner;
