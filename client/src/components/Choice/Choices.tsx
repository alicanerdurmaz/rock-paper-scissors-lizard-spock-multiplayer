import { FC } from "react";
import cx from "classnames";

import { Choice as ChoiceEnum } from "../../context/GameManager/types";
import { useGameManager } from "../../context/GameManager";
import ChoiceIcon from "./ChoiceIcon";
import PlayerDidChoose from "./PlayerDidChoose";

interface ChoicesProps {
  className?: string;
}

const ChoiceList: Exclude<ChoiceEnum, ChoiceEnum.Null>[] = [
  ChoiceEnum.Rock,
  ChoiceEnum.Paper,
  ChoiceEnum.Scissors,
  ChoiceEnum.Lizard,
  ChoiceEnum.Spock,
];

const Choices: FC<ChoicesProps> = ({ className }) => {
  const { ws, playerId, roomState } = useGameManager();

  const onClickHandler = (choice: ChoiceEnum) => {
    ws.send(
      JSON.stringify({
        command: "play",
        value: choice,
        playerId,
        roomId: roomState.roomId,
      })
    );
  };

  return (
    <div className={cx("flex flex-col", className)}>
      <ul className="list-none text-4xl flex justify-center items-center flex-wrap gap-6">
        {ChoiceList.map((choice, index) => {
          return (
            <li
              key={choice}
              onClick={() => onClickHandler(choice)}
              className="cursor-pointer transition ease-in duration-100 hover:scale-110"
            >
              <ChoiceIcon name={choice} />
            </li>
          );
        })}
      </ul>
      <h2 className="text-lg text-center mt-4 text-blueGray-600">
        select your pick
      </h2>
    </div>
  );
};

export default Choices;
