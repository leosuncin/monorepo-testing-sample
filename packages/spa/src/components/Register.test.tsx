import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';

import { Register } from './Register';

describe('<Register /> component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should render without crashing', () => {
    render(<Register />);
  });

  it('Should submit the form', async () => {
    const container = document.createElement('div');
    fetchMock.mockResponse(
      `{"name":"John Doe","email":"jhon@doe.me","id":1,"createdAt":"2019-05-15T22:22:01.221Z","updatedAt":"2019-05-15T22:22:01.221Z"}`,
    );

    const { getByLabelText, getByTestId, getByText } = render(<Register />, {
      container,
    });
    const nameInput = getByLabelText(/Email/i) as HTMLInputElement;
    const emailInput = getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
    fireEvent.change(emailInput, { target: { value: 'john@doe.me' } });
    expect(emailInput.value).toBe('john@doe.me');
    fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rd' } });
    expect(passwordInput.value).toBe('Pa$$w0rd');
    fireEvent.submit(getByTestId('register-form'));

    expect(getByText(/Sign in/i)).toBeDisabled();
  });

  it('Should show error message on already register email', async () => {
    fetchMock.mockResponse(
      '{"statusCode":422,"error":"Unprocessable Entity","message":"The email «john@doe.me» is already register."}',
      { status: 401 },
    );

    const container = document.createElement('div');
    const { getByLabelText, getByTestId, getByText } = render(<Register />, {
      container,
    });

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: 'John Jr. Doe' },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: 'john@doe.me' },
    });
    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'Pa$$w0rd' },
    });
    fireEvent.submit(getByTestId('register-form'));
    const errorMessage = await waitForElement(() =>
      getByText('The email «john@doe.me» is already register.'),
    );

    expect(container).toContainElement(errorMessage);
  });
});
