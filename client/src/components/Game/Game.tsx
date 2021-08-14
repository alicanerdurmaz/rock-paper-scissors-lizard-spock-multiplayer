import React from "react";
import { useGameManager } from "../../context/GameManager";
import ShareRoom from "../ShareRoom";
import Spinner from "../Spinner";

const Game = () => {
  const { roomState } = useGameManager();

  return <div></div>;
};

export default Game;
