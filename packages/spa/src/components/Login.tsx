import React, { useState, useContext } from 'react';

import { login, IUserLogin } from '../services/api-client';
import { AppContext } from '../context/app';

export const Login: React.FC = () => {
  const [state, setState] = useState<{ [key: string]: any }>({
    isLoading: false,
  });
  const { setUser } = useContext(AppContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Array.from<HTMLInputElement>(new Set<any>(form.elements))
      .filter(el => el.hasAttribute('name'))
      .map(el => ({
        [el.name]: el.value,
      }))
      .reduce<IUserLogin>((prev, curr) => ({ ...prev, ...curr }), {
        email: '',
        password: '',
      });
    setState({ isLoading: true });

    login(data)
      .then(user => {
        setUser(_ => user);
        setState({ isLoading: false });
      })
      .catch(err => setState({ isLoading: false, errorMessage: err.message }));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <fieldset>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          minLength={3}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          required={true}
          minLength={8}
        />
      </fieldset>
      {state.errorMessage && <p>{state.errorMessage}</p>}
      <button type="submit" disabled={state.isLoading}>
        Sign in
      </button>
    </form>
  );
};
