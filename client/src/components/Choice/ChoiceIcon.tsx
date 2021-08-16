import { FC } from "react";
import { Choice } from "../../context/GameManager/types";
import { motion } from "framer-motion";

type ChoiceWithoutNull = Exclude<Choice, Choice.Null>;

interface ChoiceIconProps {
  name: Choice;
}

export const IconMap: Record<Choice, string> = {
  [Choice.Null]: "",
  [Choice.Rock]: "💎",
  [Choice.Paper]: "📜",
  [Choice.Scissors]: "✂️",
  [Choice.Lizard]: "🐉",
  [Choice.Spock]: "🖖",
};

const ChoiceIcon: FC<ChoiceIconProps> = ({ name }) => {
  console.log(name);
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      className="rounded-full border-coolGray-100 shadow-md p-4 text-4xl"
    >
      {IconMap[name]}
    </motion.div>
  );
};

export default ChoiceIcon;
