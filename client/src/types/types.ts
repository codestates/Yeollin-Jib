export interface ILoginstate {
  isLogin: boolean;
  accessToken: string;
}

export interface ILoginpayLoad {
  payload: {
    data: {
      accessToken: string;
      message: string;
    };
  };
}
export interface Ilogin {
  email: string;
  password: string;
}
