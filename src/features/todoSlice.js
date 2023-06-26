import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getData = createAsyncThunk("todos/getData", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET",
  });
  return response.json();
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return response.json();
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (item) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${item.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        userId: item.userId,
        id: item.id,
        title: item.title,
        completed: item.completed,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return response.json();
});

export const setCompletedTodo = createAsyncThunk(
  "todos/setCompltedTodo",
  async (id) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return response.json();
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (title) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "POST",
    body: JSON.stringify({
      userId: 1,
      id: Math.floor(Math.Random * 10),
      title: title,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.json();
});

const initialState = {
  todosAllData: null,
  todosLoading: false,
  todosError: null,
  viewType: "all",
  todosData: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setViewType: (state, action) => {
      if (action.payload === "pending") {
        state.todosData = state.todosAllData.filter((item) => !item.completed);
      } else if (action.payload === "completed") {
        state.todosData = state.todosAllData.filter((item) => item.completed);
      } else {
        state.todosData = state.todosAllData;
      }
      state.viewType = action.payload;
    }
  },

  extraReducers(builder) {
    //GET TODOS

    builder.addCase(getData.pending, (state, action) => {
      state.todosLoading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.todosLoading = false;
      state.todosData = action.payload.slice(0, 10);
      state.todosData = action.payload.slice(0, 10);
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.todosLoading = false;
      state.todosError = action.error.message;
    });

    //DELETE TODO

    builder.addCase(deleteTodo.pending, (state, action) => {
      state.todosLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todosLoading = false;
      state.todosData = state.todosData.filter(
        (elem) => elem.id !== action.payload.id
      );
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.todosLoading = false;
      state.todosError = action.error.message;
    });

    //UPDATE TODO

    builder.addCase(updateTodo.pending, (state, action) => {
      state.todosLoading = true;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.todosLoading = false;
      state.todosData.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.title = action.payload.title;
          elem.completed = action.payload.completed;
        }
      });
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.todosLoading = false;
      state.todosError = action.error.message;
    });

    // COMPLETED

    builder.addCase(setCompletedTodo.pending, (state, action) => {
      state.todosLoading = true;
    });
    builder.addCase(setCompletedTodo.fulfilled, (state, action) => {
      state.todosLoading = false;
      state.todosData.forEach((elem) => {
        if (elem.id === action.payload.id) {
          elem.completed = true;
          console.log(elem.completed)
        }
      });
    });
    builder.addCase(setCompletedTodo.rejected, (state, action) => {
      state.todosLoading = false;
      state.todosError = action.error.message;
    });

    //ADD TODO

    builder.addCase(addTodo.pending, (state, action) => {
      state.todosLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todosLoading = false;
      state.todosData = state.todosData?.concat([action.payload]);
      console.log(action.payload);
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.todosLoading = false;
      state.todosError = action.error.message;
    });
  },
});
export const { setViewType, setCompleted } = todoSlice.actions;
export default todoSlice.reducer;
