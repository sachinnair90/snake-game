import { useContext } from 'react';
import { GameDataContext } from '../contexts';

export const Food = () => {
  const { gridCellSize, foodPosition, getGridCellBasePosition } = useContext(GameDataContext);

  if (!foodPosition) {
    return <></>;
  }

  const foodCoordinates = getGridCellBasePosition(foodPosition);

  if (!foodCoordinates) {
    return <></>;
  }

  return (
    <>
      <span
        className={`w-${gridCellSize} h-${gridCellSize} bg-lime-400 snake-food absolute`}
        style={{ top: foodCoordinates.top, left: foodCoordinates.left }}
      ></span>
    </>
  );
};
