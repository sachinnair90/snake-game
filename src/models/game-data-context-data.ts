import { BasePosition } from './base-position';
import { FullPosition } from './full-position';
import { GridCellPosition } from './grid-cell-position';

export interface GameDataContextData {
  snakeBodyUnitSize: number;
  playAreaPosition: FullPosition | undefined;
  movementDirection: string;
  foodPosition: BasePosition | undefined;
  snakeBodyPositions: Array<BasePosition>;
  setSnakeBodyPositions: (snakeBodyPositions: Array<BasePosition>) => void;
  getGridCellBasePosition: (gridCellPosition: GridCellPosition) => BasePosition | null;
}
