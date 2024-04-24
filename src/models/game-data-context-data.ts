import { BasePosition } from './base-position';
import { FullPosition } from './full-position';
import { GridCellPosition } from './grid-cell-position';
import { GridSize } from './grid-size';

export interface GameDataContextData {
  gridCellSize: number;
  gridSize: GridSize;
  playAreaPosition: FullPosition | undefined;
  movementDirection: string;
  foodPosition: GridCellPosition | undefined;
  snakeBodyPositions: Array<GridCellPosition>;
  setSnakeBodyPositions: (snakeBodyPositions: Array<GridCellPosition>) => void;
  getGridCellBasePosition: (gridCellPosition: GridCellPosition) => BasePosition | null;
}
