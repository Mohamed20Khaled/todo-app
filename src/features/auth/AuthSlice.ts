import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setTodos } from "../todos/TodoSlice";
import { RootState } from "../../store";
import { User, AuthState, Todo } from "../../types/types";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { user: User; todos: Todo[] },
  { username: string; password: string },
  { state: RootState }
>(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user: User = {
        id: response.data.id,
        username: response.data.username,
      };

      // Get todos specific to this user from the persisted state
      const todos = getState().todo[user.id] || [];

      // Dispatch the action to set todos for the logged-in user
      dispatch(setTodos({ userId: user.id, todos }));

      toast.success("Login successful!");

      // Redirect to /todos and replace history
      // const navigate = useNavigate();
      // navigate("/todos", { replace: true });

      return { user, todos };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Login failed. Please check your credentials.");
        return rejectWithValue(error.response.data);
      } else {
        toast.error("Login failed. An unknown error occurred.");
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
