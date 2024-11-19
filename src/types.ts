export interface User {
  userId: number;
  email: string;
  password: string;
  cardno: string;
  role: Role;
}

export enum Role {
  user,
  admin,
  poweruser,
}
