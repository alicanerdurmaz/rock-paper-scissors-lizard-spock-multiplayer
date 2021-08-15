import { memo, useEffect, useState } from "react";
import ChoiceIcon, { IconMap } from "./ChoiceIcon";

const ChoiceButtonLoop = () => {
  const [choiceIconIndex, setChoiceIconIndex] = useState(0);

  const choiceIcons = Object.values(IconMap).map((choiceIcon) => choiceIcon);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setChoiceIconIndex((prevState) => {
        const increment = prevState + 1;
        return increment % choiceIcons.length;
      });
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, [choiceIcons.length]);

  return <ChoiceIcon name={choiceIconIndex} />;
};

export default memo(ChoiceButtonLoop);
