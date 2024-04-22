import { useState } from 'react';
import { GameDataContext } from '../contexts';
import { BasePosition, GameDataContextData } from '../models';
import { GameDataProviderProps } from '../models/props/game-data-provider.props';
import { GridCellPosition } from '../models/grid-cell-position';

export const GameDataProvider = ({ children, playAreaPosition, movementDirection }: GameDataProviderProps) => {
  // Base unit 4px, size 2 for body unit = 8px
  const [snakeBodyUnitSize] = useState(2);
  const [foodPosition, setFoodPosition] = useState(new BasePosition(90, 90));
  const [snakeBodyPositions, setSnakeBodyPositions] = useState<Array<BasePosition>>([
    new BasePosition(50 - 16, 50),
    new BasePosition(50 - 8, 50),
    new BasePosition(50, 50),
  ]);

  const onSnakePositionUpdate = (updatedSnakeBodyPositions: Array<BasePosition>) => {

    const tailPosition = updatedSnakeBodyPositions[0];

    if(tailPosition.left === foodPosition.left && tailPosition.top === foodPosition.top) {
      setFoodPosition(new BasePosition(150, 150));

      updatedSnakeBodyPositions.push(tailPosition);
    }

    // TODO: Check if collision occured

    setSnakeBodyPositions(updatedSnakeBodyPositions);
  }

  const getGridCellBasePosition = (gridCellPosition: GridCellPosition) => {

    if(!playAreaPosition) {
      return null;
    }

    return new BasePosition((gridCellPosition.x * snakeBodyUnitSize) + playAreaPosition.left, (gridCellPosition.y * snakeBodyUnitSize) + playAreaPosition.top);
  }

  const context: GameDataContextData = {
    snakeBodyUnitSize,
    playAreaPosition,
    movementDirection,
    foodPosition,
    snakeBodyPositions,
    setSnakeBodyPositions: onSnakePositionUpdate,
    getGridCellBasePosition
  };

  return <GameDataContext.Provider value={context}>{children}</GameDataContext.Provider>;
};
