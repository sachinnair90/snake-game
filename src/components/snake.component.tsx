import { useEffect, useState, useContext } from 'react';
import { GridCellPosition } from '../models';
import { GameDataContext } from '../contexts';

export const Snake = () => {
  const {
    gridCellSize,
    gridSize,
    movementDirection,
    snakeBodyPositions,
    getGridCellBasePosition,
    setSnakeBodyPositions,
  } = useContext(GameDataContext);
  const [prevDirection, setPrevDirection] = useState(movementDirection);
  const HEAD_ELEM_ID = 'head';
  const MOVEMENT_TICKER_DELAY_TIME = 500;

  useEffect(() => {
    const updateHeadPosition = (arrowKey: string) => {
      const newPositions = [...snakeBodyPositions];
      const headPosition = snakeBodyPositions[snakeBodyPositions.length - 1];
      let nextPosition = new GridCellPosition(0, 0);

      switch (arrowKey) {
        case 'ArrowLeft':
          nextPosition = new GridCellPosition(Math.max(headPosition.x - 1, 0), headPosition.y);
          break;

        case 'ArrowRight':
          nextPosition = new GridCellPosition(Math.min(headPosition.x + 1, gridSize.cols), headPosition.y);
          break;

        case 'ArrowUp':
          nextPosition = new GridCellPosition(headPosition.x, Math.max(headPosition.y - 1, 0));
          break;

        case 'ArrowDown':
          nextPosition = new GridCellPosition(headPosition.x, Math.min(headPosition.y + 1, gridSize.rows));
          break;

        default:
          break;
      }

      newPositions.shift();
      newPositions.push(nextPosition);

      return newPositions;
    };

    if (prevDirection !== movementDirection) {
      setSnakeBodyPositions(updateHeadPosition(movementDirection));
      setPrevDirection(movementDirection);
    }

    const timeoutId = setTimeout(
      () => setSnakeBodyPositions(updateHeadPosition(movementDirection)),
      MOVEMENT_TICKER_DELAY_TIME
    );

    return () => clearTimeout(timeoutId);
  }, [movementDirection, snakeBodyPositions, prevDirection, gridSize, setSnakeBodyPositions]);

  return (
    <>
      {snakeBodyPositions.map((bodyPosition, index) => {
        const position = getGridCellBasePosition(bodyPosition);

        if (!position) {
          return <></>;
        }

        return (
          <div
            key={index}
            id={index === snakeBodyPositions.length - 1 ? HEAD_ELEM_ID : undefined}
            className={`h-${gridCellSize} w-${gridCellSize} bg-white absolute`}
            style={{ top: position.top, left: position.left }}
          ></div>
        );
      })}
    </>
  );
};
