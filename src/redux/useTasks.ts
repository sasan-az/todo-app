import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useCallback } from "react";
import {
  AddPayload,
  ChangeParentPayload,
  ChangeTextPayload,
  RemovePayload,
} from "redux/types";
import { add, changeParent, changeText, remove } from "redux/taskSlice";
import { Task } from "types/task";
import App from "constants/global";

type UseTasks = {
  tasks: Task[];
  addNewTask: (payload: AddPayload) => void;
  removeTask: (payload: RemovePayload) => void;
  changeTaskText: (payload: ChangeTextPayload) => void;
  changeTaskParent: (payload: ChangeParentPayload) => void;
  findParent: (task: Task) => Task | undefined;
  findPositionInParent: (task: Task) => number;
  getTaskChilds: (task: Task) => Task[];
  getRootTasks: () => Task[];
};

export default function useTasks(): UseTasks {
  const tasks = useSelector((state: RootState) => state.task);

  const dispatch = useDispatch();

  const addNewTask = useCallback(
    (payload: AddPayload) => dispatch(add(payload)),
    [dispatch]
  );

  const removeTask = useCallback(
    (payload: RemovePayload) => dispatch(remove(payload)),
    [dispatch]
  );

  const changeTaskText = useCallback(
    (payload: ChangeTextPayload) => dispatch(changeText(payload)),
    [dispatch]
  );
  const changeTaskParent = useCallback(
    (payload: ChangeParentPayload) => dispatch(changeParent(payload)),
    [dispatch]
  );

  const findParent = useCallback(
    (task: Task) => tasks.find((item) => item.id === task.parent),
    [tasks]
  );

  const findPositionInParent = useCallback(
    (task: Task) => {
      const parent = findParent(task);
      return parent
        ? parent.childs.findIndex((item) => item === task.id)
        : tasks
            .filter((item) => item.parent === App.rootName)
            .findIndex((item) => item.id === task.id);
    },
    [findParent, tasks]
  );

  const getTaskChilds = useCallback(
    (task: Task) => tasks.filter((item) => item.parent === task.id),
    [tasks]
  );

  const getRootTasks = useCallback(
    () => tasks.filter((item) => item.parent === App.rootName),
    [tasks]
  );

  return {
    tasks,
    addNewTask,
    removeTask,
    changeTaskText,
    findParent,
    findPositionInParent,
    getTaskChilds,
    getRootTasks,
    changeTaskParent,
  };
}
