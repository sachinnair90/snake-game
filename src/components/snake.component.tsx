import { useEffect, useState, useContext } from 'react';
import { BasePosition } from '../models';
import { GameDataContext } from '../contexts';

export const Snake = () => {
  const { snakeBodyUnitSize, playAreaPosition, movementDirection, snakeBodyPositions, setSnakeBodyPositions } =
    useContext(GameDataContext);
  const [prevDirection, setPrevDirection] = useState(movementDirection);
  const HEAD_ELEM_ID = 'head';
  const MOVEMENT_TICKER_DELAY_TIME = 500;

  useEffect(() => {
    const updateHeadPosition = (arrowKey: string) => {
      const headElement = document.getElementById(HEAD_ELEM_ID);

      if (!headElement || !playAreaPosition) {
        return [];
      }

      const newPositions: Array<BasePosition> = [...snakeBodyPositions];
      const headPosition = snakeBodyPositions[snakeBodyPositions.length - 1];
      let nextPosition = new BasePosition(0, 0);
      // TODO: Rotate around playarea
      // TODO: Kill at collision

      switch (arrowKey) {
        case 'ArrowLeft':
          nextPosition = new BasePosition(Math.max(headPosition.left - headElement.offsetWidth, 0), headPosition.top);
          break;

        case 'ArrowRight':
          nextPosition = new BasePosition(
            playAreaPosition.left + playAreaPosition.width - headElement.offsetWidth * snakeBodyPositions.length >
            playAreaPosition.left + headPosition.left + headElement.offsetWidth * snakeBodyPositions.length
              ? headPosition.left + headElement.offsetWidth
              : headPosition.left,
            headPosition.top
          );
          break;

        case 'ArrowUp':
          nextPosition = new BasePosition(headPosition.left, Math.max(headPosition.top - headElement.offsetHeight, 0));
          break;

        case 'ArrowDown':
          nextPosition = new BasePosition(
            headPosition.left,
            playAreaPosition.top + playAreaPosition.height - headElement.offsetHeight * snakeBodyPositions.length >
            playAreaPosition.top + headPosition.top + headElement.offsetHeight * snakeBodyPositions.length
              ? headPosition.top + headElement.offsetHeight
              : headPosition.top
          );
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
  }, [movementDirection, snakeBodyPositions, playAreaPosition, prevDirection, setSnakeBodyPositions]);

  return (
    <>
      {snakeBodyPositions.map((bodyPosition, index) => (
        <div
          key={index}
          id={index === snakeBodyPositions.length - 1 ? HEAD_ELEM_ID : undefined}
          className={`h-${snakeBodyUnitSize} w-${snakeBodyUnitSize} bg-white absolute`}
          style={{ top: bodyPosition.top, left: bodyPosition.left }}
        ></div>
      ))}
    </>
  );
};
