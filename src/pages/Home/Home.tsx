import PlusIcon from "components/PlusButton";
import { Task } from "types/task";
import { ChangeEvent, KeyboardEvent, useCallback } from "react";
import * as Styled from "./styles";
import useTasks from "redux/useTasks";
import { KeyboardKeys } from "constants/keyboard";
import Input from "components/Input";

const Home = (): JSX.Element => {
  const {
    addNewTask,
    changeTaskText,
    changeTaskParent,
    tasks,
    findPositionInParent,
    findParent,
    getRootTasks,
    getTaskChilds,
    removeTask,
  } = useTasks();

  const handleAddTask = useCallback(
    async (parent?: string) => addNewTask({ parent }),
    [addNewTask]
  );

  const handleTaskTextChanged = useCallback(
    (id: string, event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      changeTaskText({ id, title: event.target.value });
    },
    [changeTaskText]
  );

  const handleKeyUp = useCallback(
    async (task: Task, event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (event.key === KeyboardKeys.ENTER && !event.shiftKey) {
        addNewTask({ parent: task.parent });
      }
      if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key === KeyboardKeys.DELETE
      ) {
        removeTask({ parent: task.parent, id: task.id });
      }

      if (event.key === KeyboardKeys.SHIFT && !event.shiftKey) {
        const position = findPositionInParent(task);

        const parent = findParent(task);

        if (position != 0) {
          const newParent = parent
            ? parent.childs[position - 1]
            : tasks[position - 1]?.id;

          changeTaskParent({ newParent, task });
        }
      }

      return false;
    },
    [
      addNewTask,
      changeTaskParent,
      findParent,
      findPositionInParent,
      removeTask,
      tasks,
    ]
  );

  const renderInput = useCallback(
    (task: Task): JSX.Element => (
      <Input
        key={task.id}
        value={task.title}
        onChange={(event) => handleTaskTextChanged(task.id, event)}
        onKeyUp={(event) => handleKeyUp(task, event)}
      >
        {getTaskChilds(task).map((item) => renderInput(item))}
      </Input>
    ),
    [getTaskChilds, handleKeyUp, handleTaskTextChanged]
  );

  return (
    <Styled.Container>
      {getRootTasks().map((item) => renderInput(item))}
      <PlusIcon onClick={() => handleAddTask()} />
    </Styled.Container>
  );
};

export default Home;
