import React, { useState } from "react"
import Stage from "./Stage"
import Display from "./Display"
import StartButton from "./StartButton"
import { createStage, checkCollision } from "../utils/helpers"
import { usePlayer } from "../utils/use-player"
import { useStage } from "../utils/use-stage"
import { useInterval } from "../utils/use-interval"
import { useGameStatus } from "../utils/use-game-status"
type DropTimeType = number | null;
const LEFT = -1;
const RIGHT = 1;
const defaultDropTie: DropTimeType = null;

export default () => {
    const [dropTime, setDropTime] = useState<null | number>(defaultDropTie);
    const [gameOver, setGameOver] = useState(false);
    const [player, updatePlayerPos, resetPlayer, rotatePlayer] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

    const movePlayer = (dir: number) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            (updatePlayerPos as any)({ x: dir, y: 0, collided: false })
        }
    }

    const startGame = () => {
        (setStage as any)(createStage());
        (resetPlayer as any)();
        setGameOver(false);
        setDropTime((1000 / ((level as number) + 1)) + 200);
        (setScore as any)(0);
        (setLevel as any)(0);
        (setRows as any)(0);

    }



    const drop = () => {
        if (rows > ((level as number) + 1) * 10) {
            (setLevel as React.Dispatch<React.SetStateAction<number>>)(prev => prev + 1);
            setDropTime((1000 / ((level as number) + 1)) + 200);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            (updatePlayerPos as any)({ x: 0, y: 1, collided: false });
        } else {
            if ((player as any).pos.y < 1) {
                console.log('GAME OVER!!!');
                setGameOver(true);
                setDropTime(null);
            }
            (updatePlayerPos as any)({ x: 0, y: 0, collided: true });
        }

    }

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    }

    const keyUp = ({ keyCode }: React.KeyboardEvent) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime((1000 / ((level as number) + 1)) + 200);
            }
        }
    }

    const move = ({ keyCode }: React.KeyboardEvent) => {
        if (!gameOver) {
            switch (keyCode) {
                case 40:
                    dropPlayer();
                    break;
                case 37:
                    movePlayer(LEFT);
                    break;
                case 39:
                    movePlayer(RIGHT);;
                    break;
                case 38:
                    (rotatePlayer as any)(stage, 1);
                    break;
                default:
                    break;
            }

        }

    }

    useInterval(drop, dropTime);

    return (
        <div className="tetris-wraper" role="button" tabIndex={0} onKeyDown={e => move(e)} onKeyUp={e => keyUp(e)}>
            <div className="tetris">
                <Stage stage={stage as any[][]} />
                <aside>
                    {gameOver ? (
                        <Display text="Game Over" gameOver={gameOver} />
                    ) : (
                            <div>
                                <Display text={`Score:  ${score}`} gameOver={gameOver} />
                                <Display text={`Rows: ${rows}`} gameOver={gameOver} />
                                <Display text={`Level: ${level}`} gameOver={gameOver} />
                            </div>
                        )}
                    <StartButton onStart={startGame} />
                </aside>
            </div>
        </div>
    )
}