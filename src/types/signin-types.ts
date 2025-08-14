export interface ISigninFormState {
  errors: {
    username: string | undefined;
    password: string | undefined;
  };
  status: string;
}
