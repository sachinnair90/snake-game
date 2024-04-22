import { useContext } from 'react';
import { GameDataContext } from '../contexts';

export const Food = () => {
  const { foodPosition } = useContext(GameDataContext);

  if (!foodPosition) {
    return <></>;
  }

  return (
    <>
      <span
        className={`w-2 h-2 bg-lime-400 snake-food absolute`}
        style={{ top: foodPosition.top, left: foodPosition.left }}
      ></span>
    </>
  );
};
