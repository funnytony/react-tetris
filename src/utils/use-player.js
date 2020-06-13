import { useState, useCallback } from "react";
import { getRandomTetrominos, getRandomCollor, BLACK } from "./tetrominos";
import { STAGE_WIDTH, checkCollision } from "./helpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: [[0]],
    callor: BLACK,
    collided: false,
  });

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const rotate = (tetromino, diraction) => {
    const rotatedTetro = tetromino.map((_, index) =>
      tetromino.map((coll) => coll[index])
    );
    if (diraction > 0) return rotatedTetro.map((row) => row.reverse());
    return rotatedTetro.reverse();
  };

  const rotatePlayer = (stage, diraction) => {
    const clonPlayer = JSON.parse(JSON.stringify(player));
    clonPlayer.tetromino = rotate(clonPlayer.tetromino, diraction);
    const pos = clonPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonPlayer, stage, { x: 0, y: 0 })) {
      clonPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if(offset > clonPlayer.tetromino[0].length) {
        rotate(clonPlayer.tetromino, - diraction);
        clonPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonPlayer);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: getRandomTetrominos().shape,
      callor: getRandomCollor(),
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer, rotatePlayer];
};
