import { configureStore } from "@reduxjs/toolkit";
import taskBoardReducer from "../features/tasks/TaskSlice";

const store = configureStore({
  reducer: {
    tasks: taskBoardReducer,
  },
});

// Save to localStorage on every state change
store.subscribe(() => {
  const state = store.getState().tasks.columns;
  localStorage.setItem("taskBoardState", JSON.stringify(state));
});

export default store;
