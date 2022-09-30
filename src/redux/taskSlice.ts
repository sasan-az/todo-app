import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { Task } from "types/task";
import {
  AddPayload,
  ChangeParentPayload,
  ChangeTextPayload,
  RemovePayload,
} from "redux/types";
import App from "constants/global";

const initialState: Task[] = [];

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<AddPayload>) => {
      const {
        payload: { parent },
      } = action;
      const id = uuid();

      return [
        ...state,
        {
          id,
          title: "",
          childs: [],
          parent: parent ?? App.rootName,
        },
      ].map((item) =>
        item.id === parent ? { ...item, childs: [...item.childs, id] } : item
      );
    },

    remove: (state, action: PayloadAction<RemovePayload>) => {
      const {
        payload: { id, parent },
      } = action;
      return state
        .filter((item) => item.id !== id)
        .map((item) =>
          item.id === parent
            ? {
                ...item,
                childs: item.childs.filter((item) => item !== id),
              }
            : item
        );
    },

    changeText: (state, action: PayloadAction<ChangeTextPayload>) => {
      const {
        payload: { title, id },
      } = action;
      return state.map((item) => (item.id === id ? { ...item, title } : item));
    },

    changeParent: (state, action: PayloadAction<ChangeParentPayload>) => {
      const {
        payload: { newParent, task },
      } = action;

      return state.map((item) =>
        item.id === newParent
          ? {
              ...item,
              childs: [...item.childs, task.id],
            }
          : item.id === task.id
          ? {
              ...item,
              parent: newParent,
            }
          : item.id === task.parent
          ? {
              ...item,
              childs: item.childs.filter((item) => item === task.id),
            }
          : item
      );
    },
  },
});

export const { add, changeText, changeParent, remove } = taskSlice.actions;

export default taskSlice.reducer;
