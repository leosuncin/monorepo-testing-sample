const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';

export interface IUserRegister {
  name: string;
  email: string;
  password: string;
}

export async function register(signUpData: IUserRegister) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('Accept', 'application/json; charset=utf-8');

  const resp = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(signUpData),
  });
  const json = await resp.json();

  if (resp.status >= 400) {
    throw new Error(json.message);
  }

  return json;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export async function login(signInData: IUserLogin) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json; charset=utf-8');
  headers.append('Accept', 'application/json; charset=utf-8');

  const resp = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers,
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(signInData),
  });
  const json = await resp.json();

  if (resp.status >= 400) {
    throw new Error(json.message);
  }

  return json;
}
