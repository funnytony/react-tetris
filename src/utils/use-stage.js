import { useState, useEffect } from "react";
import { createStage } from "./helpers";
import { BLACK } from "./tetrominos";
import { STAGE_WIDTH } from "./helpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const sweepRows = (newStage) =>
      newStage.reduce((ack, row) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          ack.unshift(new Array(STAGE_WIDTH).fill([0, "clear", BLACK]));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateStage = (prevStage) => {
      //flush the stage
      const newStage = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear", BLACK] : cell))
      );
      //draw tetrominos
      player.tetromino.forEach((row, y) =>
        row.forEach((cell, x) => {
          if (cell === 1) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              1,
              `${player.collided ? "merg" : "clear"}`,
              player.callor,
            ];
          }
        })
      );
      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};
