import { useRef, useState } from 'react';
import { SCROLL_SPEED } from '../constants/constants';

const useHorizontalScroll = () => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const ref = useRef<HTMLElement | null>(null);

  const onMouseDown = (e: { pageX: number }) => {
    setIsDown(true);

    if (ref.current) {
      setStartX(e.pageX - ref.current.offsetLeft);
      setScrollLeft(ref.current.scrollLeft);
    }
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e: { preventDefault: () => void; pageX: number }) => {
    if (!isDown) {
      return;
    }

    e.preventDefault();

    if (ref.current) {
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX) * SCROLL_SPEED;

      ref.current.scrollLeft = scrollLeft - walk;
    }
  };

  return {
    ref,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};

export default useHorizontalScroll;
