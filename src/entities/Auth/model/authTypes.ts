export interface IAuthUser {
  id: number;
  email: string;
  full_name: string;
  supplier_id: number;
}

export interface IAuthCredits {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  access_token: string;
}

export type TAuthValue =
  | {
      isAuth: true;
      user: IAuthUser;
    }
  | {
      isAuth: false;
      user: null;
    };

export type TAuthContextValue = {
  login: (credits: IAuthCredits) => void;
  logout: () => void;
} & TAuthValue;
