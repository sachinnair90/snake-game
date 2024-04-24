import { BasePosition } from './base-position';

export class FullPosition extends BasePosition {
  width: number;
  height: number;

  constructor(left: number, top: number, height: number, width: number) {
    super(left, top);

    this.height = height;
    this.width = width;
  }
}
