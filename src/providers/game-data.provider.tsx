import { useState, useCallback, useEffect } from 'react';
import { GameDataContext } from '../contexts';
import { BasePosition, GameDataContextData } from '../models';
import { GameDataProviderProps } from '../models/props/game-data-provider.props';
import { GridCellPosition } from '../models/grid-cell-position';
import { BASE_UNIT_IN_PX } from '../constants/game.constants';

export const GameController = ({ children, playAreaPosition, movementDirection }: GameDataProviderProps) => {
  // Base unit 4px, size 2 for body unit = 8px
  const [gridCellSize] = useState(2);

  const getGridSize = useCallback(
    () => ({
      rows: Math.floor((playAreaPosition?.height || 0) / (BASE_UNIT_IN_PX * gridCellSize)) - 1,
      cols: Math.floor((playAreaPosition?.width || 0) / (BASE_UNIT_IN_PX * gridCellSize)) - 1,
    }),
    [playAreaPosition, gridCellSize]
  );

  const [gridSize, setGridSize] = useState(getGridSize());

  const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

  const getRandomGridCellPosition = useCallback((maxCols: number, maxRows: number) => {
    return new GridCellPosition(randomIntFromInterval(0, maxCols), randomIntFromInterval(0, maxRows));
  }, []);

  const [foodPosition, setFoodPosition] = useState(getRandomGridCellPosition(gridSize.cols, gridSize.rows));

  useEffect(() => {
    const newGridSize = getGridSize();
    setGridSize(newGridSize);
    setFoodPosition(getRandomGridCellPosition(newGridSize.cols, newGridSize.rows));
  }, [setFoodPosition, getRandomGridCellPosition, getGridSize, setGridSize]);

  const [snakeBodyPositions, setSnakeBodyPositions] = useState([
    new GridCellPosition(0, 0),
    new GridCellPosition(1, 0),
    new GridCellPosition(2, 0),
  ]);

  const onSnakePositionUpdate = (updatedSnakeBodyPositions: Array<GridCellPosition>) => {
    const tailPosition = updatedSnakeBodyPositions[0];

    if (tailPosition.x === foodPosition.x && tailPosition.y === foodPosition.y) {
      setFoodPosition(getRandomGridCellPosition(gridSize.cols, gridSize.rows));

      updatedSnakeBodyPositions.unshift(tailPosition);
    }

    // TODO: Check if collision occured
    // TODO: Rotate around playarea
    // TODO: Kill at collision
    // TODO: Score calculation

    setSnakeBodyPositions(updatedSnakeBodyPositions);
  };

  const getGridCellBasePosition = (gridCellPosition: GridCellPosition) => {
    if (!playAreaPosition) {
      return null;
    }

    return new BasePosition(
      gridCellPosition.x * (gridCellSize * BASE_UNIT_IN_PX),
      gridCellPosition.y * (gridCellSize * BASE_UNIT_IN_PX)
    );
  };

  const context: GameDataContextData = {
    gridCellSize,
    playAreaPosition,
    movementDirection,
    foodPosition,
    snakeBodyPositions,
    setSnakeBodyPositions: onSnakePositionUpdate,
    getGridCellBasePosition,
    gridSize,
  };

  return <GameDataContext.Provider value={context}>{children}</GameDataContext.Provider>;
};
