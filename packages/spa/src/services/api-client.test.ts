import { register, login } from './api-client';

describe('Authentication', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should allow to register', () => {
    expect.assertions(1);
    fetchMock.mockResponse(
      `{
      "name": "John Doe",
      "email": "jhon@doe.me",
      "id": 1,
      "createdAt": "2019-05-15T22:22:01.221Z",
      "updatedAt": "2019-05-15T22:22:01.221Z"
    }`,
    );

    const registerData = {
      name: 'John Doe',
      email: 'jhon@doe.me',
      password: 'Pa$$w0rd',
    };

    expect(register(registerData)).resolves.toStrictEqual({
      name: 'John Doe',
      email: 'jhon@doe.me',
      id: 1,
      createdAt: '2019-05-15T22:22:01.221Z',
      updatedAt: '2019-05-15T22:22:01.221Z',
    });
  });

  it('Should throw an error on register fail', () => {
    expect.assertions(1);
    fetchMock.mockResponse(
      `{
      "statusCode": 422,
      "error": "Unprocessable Entity",
      "message": "The email «john@doe.me» is already register."
    }`,
      { status: 422 },
    );

    const registerData = {
      name: 'John Jr. Doe',
      email: 'jhon@doe.me',
      password: 'Pa$$w0rd',
    };

    expect(register(registerData)).rejects.toThrow(
      'The email «john@doe.me» is already register.',
    );
  });

  it('Should allow to log in', () => {
    expect.assertions(1);
    fetchMock.mockResponse(`{
      "name": "John Doe",
      "email": "jhon@doe.me",
      "id": 1,
      "createdAt": "2019-05-15T22:22:01.221Z",
      "updatedAt": "2019-05-15T22:22:01.221Z"
    }`);

    const signInData = {
      email: 'jhon@doe.me',
      password: 'Pa$$w0rd',
    };

    expect(login(signInData)).resolves.toStrictEqual({
      name: 'John Doe',
      email: 'jhon@doe.me',
      id: 1,
      createdAt: '2019-05-15T22:22:01.221Z',
      updatedAt: '2019-05-15T22:22:01.221Z',
    });
  });

  it('Should throw an error on log in fail', () => {
    expect.assertions(1);
    fetchMock.mockResponse(
      `{
      "statusCode": 401,
      "error": "Unauthorized",
      "message": "Wrong password for user with email: john@doe.me"
    }`,
      { status: 401 },
    );

    const signInData = {
      email: 'jhon@doe.me',
      password: 'Not my password',
    };

    expect(login(signInData)).rejects.toThrow(
      'Wrong password for user with email: john@doe.me',
    );
  });

  it('Should throw an error on connection error', () => {
    expect.hasAssertions();
    fetchMock.mockReject(
      new Error('NetworkError when attempting to fetch resource.'),
    );

    expect(
      register({
        name: 'John Doe',
        email: 'jhon@doe.me',
        password: 'Pa$$w0rd',
      }),
    ).rejects.toThrow('NetworkError when attempting to fetch resource.');
    expect(
      login({
        email: 'jhon@doe.me',
        password: 'Pa$$w0rd',
      }),
    ).rejects.toThrow('NetworkError when attempting to fetch resource.');
  });
});
