import { createContext } from 'react';
import { GameDataContextData } from '../models';

export const GameDataContext = createContext<GameDataContextData>({} as GameDataContextData);
GameDataContext.displayName = 'SnakeGameData';
