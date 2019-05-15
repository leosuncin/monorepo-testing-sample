import React, { useState, useEffect } from 'react';

interface CounterProps {
  initialCount?: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  const incrementCount = (event: React.MouseEvent) => {
    event.persist();
    setCount(currentCount => currentCount + 1);
  };

  const decrementCount = (event: React.MouseEvent) => {
    event.persist();
    setCount(currentCount => currentCount - 1);
  };

  return (
    <>
      <span
        data-testid="counter"
        style={{ display: 'block', fontSize: '2em', margin: '0.5em 1em' }}
      >
        {count}
      </span>
      <button onClick={incrementCount}>Up</button>
      <button onClick={decrementCount}>Down</button>
    </>
  );
};

Counter.defaultProps = {
  initialCount: 0,
};
