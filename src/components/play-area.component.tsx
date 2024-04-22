/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FullPosition } from '../models';
import { Snake } from './snake.component';
import { Food } from './food.component';
import { GameDataProvider } from '../providers';
import { useState, useRef, useEffect } from 'react';

export const PlayArea = () => {
  const [playAreaPosition, setPlayAreaPosition] = useState(new FullPosition(0, 0, 0, 0));
  const [key, setKey] = useState('ArrowRight');
  const elementRef = useRef<HTMLDivElement>(null);

  const PLAY_AREA_ELEM_ID = 'play-area';

  // TODO: Random food positions
  // TODO: Grow on eating food

  // TODO: Score calculation

  useEffect(() => {
    if (elementRef.current) {
      const _ = elementRef.current.getBoundingClientRect();
      setPlayAreaPosition(new FullPosition(_.left, _.top, _.height, _.width));
    }
  }, []);

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code.indexOf('Arrow') !== 0) {
      return;
    }

    switch (event.code) {
      case 'ArrowLeft':
        if (key === 'ArrowRight') {
          return;
        }
        break;
      case 'ArrowRight':
        if (key === 'ArrowLeft') {
          return;
        }
        break;
      case 'ArrowUp':
        if (key === 'ArrowDown') {
          return;
        }
        break;
      case 'ArrowDown':
        if (key === 'ArrowUp') {
          return;
        }
        break;

      default:
        break;
    }

    setKey(event.code);
  };

  return (
    <>
      <h1 className="h1 text-4xl text-white mb-16">Snake game!</h1>
      <div
        ref={elementRef}
        id={PLAY_AREA_ELEM_ID}
        className="relative border-2 rounded min-h-96 min-w-96 bg-gray-900 focus:outline-none focus:ring focus:ring-violet-300"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex, jsx-a11y/tabindex-no-positive
        tabIndex={1}
        onKeyUp={onKeyUp}
      >
        <GameDataProvider movementDirection={key} playAreaPosition={playAreaPosition}>
          <Snake />
          <Food />
        </GameDataProvider>
      </div>
    </>
  );
};
