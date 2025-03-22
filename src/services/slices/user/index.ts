import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  TRegisterData,
  TLoginData
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: null | SerializedError;
  user: TUser;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  error: null,
  user: {
    email: '',
    name: ''
  }
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetData(state) {
      state = initialState;
    }
  },
  selectors: {
    getUserAuthenticatedSelector: (state) => state.isAuthenticated,
    getUserSelector: (state) => state.user,
    getUserIsAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = false;
      })

      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        //state.isAuthenticated = true;
      })

      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = initialState.user;
      })

      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const {
  getUserSelector,
  getUserIsAuthCheckedSelector,
  getUserAuthenticatedSelector
} = userSlice.selectors;

export const { resetData } = userSlice.actions;
