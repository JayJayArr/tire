export class User {
  userId: number;
  email: string;
  password: string;
  cardno: string;
  roles: Role[];
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  PowerUser = 'poweruser',
}
