import { PropsWithChildren } from 'react';
import { FullPosition } from '../full-position';

export type GameDataProviderProps = {
  playAreaPosition: FullPosition | undefined;
  movementDirection: string;
} & PropsWithChildren;
