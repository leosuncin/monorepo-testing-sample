import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { Counter } from './Counter';

describe('<Count /> component', () => {
  it('Should render without crashing', () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId('counter')).toHaveTextContent('0');
  });

  it('Should render the passed initialState', () => {
    const { getByTestId } = render(<Counter initialCount={42} />);
    expect(getByTestId('counter')).toHaveTextContent('42');
  });

  it('Should increment the count', () => {
    const { getByTestId, getByText } = render(<Counter />);

    fireEvent.click(getByText(/Up/i));
    expect(getByTestId('counter')).toHaveTextContent('1');
    expect(document.title).toBe('Count: 1');
  });

  it('Should decrement the count', () => {
    const { getByTestId, getByText } = render(<Counter initialCount={10} />);

    fireEvent.click(getByText(/Down/i));
    expect(getByTestId('counter')).toHaveTextContent('9');
    expect(document.title).toBe('Count: 9');
  });
});
