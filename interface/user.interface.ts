export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface ResponseUser {
  user: User;
  token: string;
}
