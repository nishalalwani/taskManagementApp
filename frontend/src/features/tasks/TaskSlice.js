import { createSlice } from "@reduxjs/toolkit";
import { columns } from "../../data/columnsData";

// Load saved state from localStorage or fallback to default columns
const saved = localStorage.getItem("taskBoardState");
const initialColumns = saved ? JSON.parse(saved) : columns;

// Create taskSlice for managing the task board's state
const taskSlice = createSlice({
  name: "taskBoard",
  initialState: {
    columns: initialColumns, 
    filter: {
      priority: "All", 
      date: "All",     
    },
  },
  reducers: {
    // Add a new task to a specific column
    addTask: (state, action) => {
      const { columnTitle, title, description, priority, dueDate } = action.payload;

      // Find the target column by its title
      const column = state.columns.find((c) => c.title === columnTitle);

      if (column) {
        column.tasks.push({
          id: Date.now(),             
          title,                      
          description,                
          priority: priority || "Low",
          comments: 0,                
          files: 0,                   
          dueDate: dueDate || null,   
        });
      }
    },

    // Move a task from one column to another
    moveTask: (state, action) => {
      const { fromColTitle, toColTitle, taskIndex } = action.payload;

      // Do nothing if task is moved within the same column
      if (fromColTitle === toColTitle) return;

      const fromCol = state.columns.find((col) => col.title === fromColTitle);
      const toCol = state.columns.find((col) => col.title === toColTitle);

      // Remove the task from the original column and add to the new one
      const [task] = fromCol.tasks.splice(taskIndex, 1);
      toCol.tasks.push(task);
    },

    // Set filter for priority and/or date
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,       
        ...action.payload,    
      };
    },
  },
});

export const { addTask, moveTask, setFilter } = taskSlice.actions;


export default taskSlice.reducer;
