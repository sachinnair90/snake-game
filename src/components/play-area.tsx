import { useEffect, useState } from 'react';

const PlayArea = () => {

  const [positions, setPositions] = useState<Array<{ top: number, left: number }>>([{ top: 50, left: 50 - 16 }, { top: 50, left: 50 - 8 }, { top: 50, left: 50 }]);
  const [key, setKey] = useState('ArrowRight');

  // TODO: Random food positions
  // TODO: Grow on eating food

  // TODO: Score calculation

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateHeadPosition(key);
    }, 500);

    return () => clearTimeout(timeoutId);
  });

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code.indexOf('Arrow') !== 0) {
      return;
    }

    switch (event.code) {
      case 'ArrowLeft':
        if(key === 'ArrowRight') { return; }
        break;
      case 'ArrowRight':
        if(key === 'ArrowLeft') { return; }
        break;
      case 'ArrowUp':
        if(key === 'ArrowDown') { return; }
        break;
      case 'ArrowDown':
        if(key === 'ArrowUp') { return; }
        break;

      default:
        break;
    }
    
    setKey(event.code);
  }

  const updateHeadPosition = (arrowKey: string) => {
    const headElement = document.getElementById('head');
    const containerElement = document.getElementById('play-area');

    if (!containerElement || !headElement) {
      return;
    }

    const playAreaPostion = containerElement.getBoundingClientRect();
    let newPositions: Array<{ top: number, left: number }> = [...positions];
    const headPosition = positions[positions.length - 1];

    // TODO: Rotate around playarea
    // TODO: Kill at collision

    switch (arrowKey) {
      case 'ArrowLeft':
        newPositions.splice(0, 1);
        newPositions.push({ left: Math.max(headPosition.left - headElement.offsetWidth, 0), top: headPosition.top });
        break;
      case 'ArrowRight':
        newPositions.splice(0, 1);
        newPositions = [...newPositions, { left: (playAreaPostion.right - (headElement.offsetWidth * positions.length) > (playAreaPostion.left + headPosition.left + (headElement.offsetWidth * positions.length)) ? headPosition.left + headElement.offsetWidth : headPosition.left), top: headPosition.top }];
        break;
      case 'ArrowUp':
        newPositions.splice(0, 1);
        newPositions.push({ left: headPosition.left, top: Math.max(headPosition.top - headElement.offsetHeight, 0) });
        break;
      case 'ArrowDown':
        newPositions.splice(0, 1);
        newPositions.push({ left: headPosition.left, top: (playAreaPostion.bottom - (headElement.offsetHeight * positions.length) > (playAreaPostion.top + headPosition.top + (headElement.offsetHeight * positions.length)) ? headPosition.top + headElement.offsetHeight : headPosition.top) });
        break;

      default:
        break;
    }

    setPositions(newPositions);
  }

  return (<>
    <div id="play-area" className="relative border-2 rounded min-h-96 min-w-96 bg-gray-900 focus:outline-none focus:ring focus:ring-violet-300" tabIndex={1} onKeyUp={onKeyUp}>
      {positions.map((bodyPosition, index) => <div key={index} id={index === positions.length - 1 ? "head" : undefined} className="h-2 w-2 bg-white absolute" style={{ top: bodyPosition.top, left: bodyPosition.left }}></div>)}
    </div>
  </>);
}

export default PlayArea;