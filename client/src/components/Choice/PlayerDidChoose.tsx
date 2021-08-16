import { Choice, ChoiceName } from "../../context/GameManager/types";
import ChoiceIconLoop from "./ChoiceIconLoop";
import ChoiceIcon from "./ChoiceIcon";

const PlayerDidChoose = ({ playerChoice }: { playerChoice: Choice }) => {
  return (
    <div className="flex justify-between md:justify-center items-center text-left">
      <div className="flex items-center justify-center flex-col">
        <ChoiceIcon name={playerChoice} />
        <div className="mt-2 text-l md:text-2xl">
          you choose {ChoiceName[playerChoice]}
        </div>
      </div>

      <div className="font-bold text-xl md:text-5xl md:mx-24">VS</div>

      <div className="flex items-center justify-center flex-col">
        <ChoiceIconLoop />
        <div className="mt-2 text-l md:text-2xl">waiting for them</div>
      </div>
    </div>
  );
};

export default PlayerDidChoose;
