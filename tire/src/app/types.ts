export interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

export interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

export interface TimeEntry {
  name?: string;
  indevice: string;
  outdevice?: string;
  intime: Date;
  outtime: Date;
  diff: { hour: number; minute: number; second: number };
}
//TODO: Remove the option on the intime, if a line exists it should always have a intime

export interface User {
  email: string;
  cardno: string;
  role: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  PowerUser = 'poweruser',
}
