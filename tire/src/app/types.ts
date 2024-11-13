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
  outdevice: string;
  intime: Date;
  outtime: Date;
  difference: number;
}

export interface User {
  cardno: string;
  role: string;
}
