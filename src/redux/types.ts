import { Task } from "types/task";

export type AddPayload = {
  parent?: string;
};

export type ChangeTextPayload = {
  title: string;
  id: string;
};

export type RemovePayload = {
  id: string;
  parent: string;
};

export type ChangeParentPayload = {
  newParent: string;
  task: Task;
};
