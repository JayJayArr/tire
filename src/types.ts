export class User {
  userId: number;
  email: string;
  password: string;
  cardno: string;
  roles: Role[] = [Role.User];
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  PowerUser = 'poweruser',
}
