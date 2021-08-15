import { FC } from "react";
import { Choice } from "../../context/GameManager/types";

type ChoiceWithoutNull = Exclude<Choice, Choice.Null>;

interface ChoiceIconProps {
  name: ChoiceWithoutNull;
}

export const IconMap: Record<ChoiceWithoutNull, string> = {
  [Choice.Rock]: "💎",
  [Choice.Paper]: "📜",
  [Choice.Scissors]: "✂️",
  [Choice.Lizard]: "🐉",
  [Choice.Spock]: "🖖",
};

const ChoiceIcon: FC<ChoiceIconProps> = ({ name }) => {
  return (
    <div className="rounded-full border-coolGray-100 shadow-md p-4 text-4xl">
      {IconMap[name]}
    </div>
  );
};

export default ChoiceIcon;
