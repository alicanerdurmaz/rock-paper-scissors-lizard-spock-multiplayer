import { FC, MouseEventHandler, ReactNode } from "react";
import cx from "classnames";
import {
  ChoiceName,
  Choice as ChoiceEnum,
} from "../../context/GameManager/types";
import { useGameManager } from "../../context/GameManager";
import ChoiceButtonLoop from "./ChoiceButtonLoop";
import ChoiceIcon from "./ChoiceIcon";

interface ChoicesProps {
  className?: string;
}

const Choice = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLLIElement>;
}) => {
  return (
    <li
      onClick={onClick}
      className="cursor-pointer transition ease-in duration-100 hover:scale-110"
    >
      {children}
    </li>
  );
};

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

  const playerChoice = roomState.choices[playerId];
  const playerDidChoose = playerChoice !== ChoiceEnum.Null;

  return (
    <div className={cx("flex flex-col", className)}>
      {playerDidChoose && (
        <div className="flex justify-between md:justify-center items-center text-left">
          <div className="flex items-center justify-center flex-col">
            <ChoiceIcon name={ChoiceEnum.Rock} />
            <div className="mt-2 text-l md:text-2xl">
              you choose {ChoiceName[playerChoice]}
            </div>
          </div>

          <div className="font-bold text-xl md:text-5xl md:mx-24">VS</div>

          <div className="flex items-center justify-center flex-col">
            <ChoiceButtonLoop />
            <div className="mt-2 text-l md:text-2xl">waiting for them</div>
          </div>
        </div>
      )}
      {!playerDidChoose && (
        <>
          <ul className="list-none text-4xl flex justify-center items-center flex-wrap gap-6">
            <Choice onClick={() => onClickHandler(ChoiceEnum.Rock)}>
              <ChoiceIcon name={ChoiceEnum.Rock} />
            </Choice>
            <Choice onClick={() => onClickHandler(ChoiceEnum.Paper)}>
              <ChoiceIcon name={ChoiceEnum.Paper} />
            </Choice>
            <Choice onClick={() => onClickHandler(ChoiceEnum.Scissors)}>
              <ChoiceIcon name={ChoiceEnum.Scissors} />
            </Choice>
            <Choice onClick={() => onClickHandler(ChoiceEnum.Lizard)}>
              <ChoiceIcon name={ChoiceEnum.Lizard} />
            </Choice>
            <Choice onClick={() => onClickHandler(ChoiceEnum.Spock)}>
              <ChoiceIcon name={ChoiceEnum.Spock} />
            </Choice>
          </ul>
          <h2 className="text-lg text-center mt-4 text-blueGray-600">
            select your pick
          </h2>
        </>
      )}
    </div>
  );
};

export default Choices;
