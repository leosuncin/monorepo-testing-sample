import React, { useState, useContext } from 'react';

import { register, IUserRegister } from '../services/api-client';
import { AppContext } from '../context/app';

interface RegisterValues {
  isLoading: boolean;
  errorMessage?: string;
}
const defaultValues: RegisterValues = { isLoading: false };

export const Register: React.FC = () => {
  const [values, setValues] = useState<RegisterValues>(defaultValues);
  const { setUser } = useContext(AppContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Array.from<HTMLInputElement>(new Set<any>(form.elements))
      .filter(el => el.hasAttribute('name'))
      .map(el => ({
        [el.name]: el.value,
      }))
      .reduce<IUserRegister>((prev, curr) => ({ ...prev, ...curr }), {
        name: '',
        email: '',
        password: '',
      });
    setValues({ isLoading: true });

    register(data)
      .then(user => {
        setUser(_ => user);
        setValues({ isLoading: false });
      })
      .catch(err => setValues({ isLoading: false, errorMessage: err.message }));
  };

  return (
    <form onSubmit={handleSubmit} data-testid="register-form">
      <fieldset>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" required={true} />
      </fieldset>
      <fieldset>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" required={true} />
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          required={true}
        />
      </fieldset>
      {values.errorMessage && <p>{values.errorMessage}</p>}
      <button type="submit" disabled={values.isLoading}>
        Sign up
      </button>
    </form>
  );
};
