export interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

export interface TimeEntry {
  id: number;
  name: string;
  indevice: string;
  outdevice?: string;
  intime: Date;
  outtime?: Date;
  diff?: { hour: number; minute: number; second: number };
}

export interface TimeDiff {
  hour: number;
  minute: number;
  second: number;
}
export interface User {
  email: string;
  cardno: string;
  role: Role[];
  active: boolean;
}

export interface Connector {
  name: String;
  active: boolean;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  PowerUser = 'poweruser',
}
