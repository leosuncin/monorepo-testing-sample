import React from 'react';
import { render, fireEvent, waitForElement } from 'react-testing-library';

import { Login } from './Login';

describe('<Login /> component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should render without crashing', () => {
    render(<Login />);
  });

  it.skip('Should submit the form', async () => {
    const container = document.createElement('div');
    fetchMock.mockResponse(
      `{
        "name": "John Doe",
        "email": "jhon@doe.me",
        "id": 1,
        "createdAt": "2019-05-15T22:22:01.221Z",
        "updatedAt": "2019-05-15T22:22:01.221Z"
      }`,
    );

    const { getByLabelText, getByTestId, getByText } = render(<Login />, {
      container,
    });
    const emailInput = getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = getByLabelText(/Password/i) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'john@doe.me' } });
    expect(emailInput.value).toBe('john@doe.me');
    fireEvent.change(passwordInput, { target: { value: 'Pa$$w0rd' } });
    expect(passwordInput.value).toBe('Pa$$w0rd');
    fireEvent.submit(getByTestId('login-form'));

    expect(getByText(/Sign in/i)).toBeDisabled();
  });

  it.skip('Should show error message with invalid credentials', async () => {
    fetchMock.mockResponse(
      '{"statusCode":401,"error":"Unauthorized","message":"Wrong password for user with email: john@doe.me"}',
      {status: 401},
    );
    const container = document.createElement('div');
    const { getByLabelText, getByTestId, getByText } = render(<Login />, {
      container,
    });

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: 'john@doe.me' },
    });
    fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'not-my-password' },
    });
    fireEvent.submit(getByTestId('login-form'));
    const errorMessage = await waitForElement(() =>
      getByText('Wrong password for user with email: john@doe.me'),
    );

    expect(container).toContainElement(errorMessage);
  });
});
