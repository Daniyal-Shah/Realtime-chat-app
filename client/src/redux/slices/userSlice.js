import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../api';
import { store } from '../store/store';
import { axiosInstance } from '../../api/api';

export const signinUserAction = createAsyncThunk(
  'signinUser',
  async (payload) => {
    // store.dispatch(showLoading(true));
    try {
      const { data } = await axiosInstance.post(`user/signin`, payload);

      return data;
    } catch (error) {
      alert(JSON.stringify(error));
    }

    // store.dispatch(showLoading(false));
  },
);

export const getAllUsersAction = createAsyncThunk('getAllUsers', async () => {
  // store.dispatch(showLoading(true));
  try {
    const { data } = await axiosInstance.get(`user`);
    return data;
  } catch (error) {
    alert(JSON.stringify(error));
  }
  // store.dispatch(showLoading(false));
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    allUsers: [],
    loggedInUser: {},
    chattingUser: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(signinUserAction.fulfilled, (state, action) => {
      return {
        ...state,
        loggedInUser: action.payload,
      };
    });

    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      const filteredUsers = action?.payload?.filter(
        (item) => item._id != state?.loggedInUser?._id,
      );
      return {
        ...state,
        allUsers: filteredUsers,
      };
    });
  },
  reducers: {
    // omit existing reducers here
    setChattingUserAction(state, action) {
      return {
        ...state,
        chattingUser: action.payload,
      };
    },

    showLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    cleanStore(state, action) {
      return {
        allUsers: [],
        loggedInUser: {},
        chattingUser: {},
      };
    },
  },
});

export const { setChattingUserAction, cleanStore, showLoading } =
  userSlice.actions;

export default userSlice.reducer;
