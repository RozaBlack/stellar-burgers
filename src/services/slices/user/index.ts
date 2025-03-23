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
import { deleteCookie, setCookie } from '../../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  registerError: null | SerializedError;
  loginError: null | SerializedError;
  error: null | SerializedError;
  user: TUser;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  registerError: null,
  loginError: null,
  error: null,
  user: {
    email: '',
    name: ''
  }
};

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const res = await registerUserApi(registerData);
    localStorage.setItem('refreshToken', String(res.refreshToken));
    setCookie('accessToken', String(res.accessToken));
    return res;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', String(res.refreshToken));
    setCookie('accessToken', String(res.accessToken));
    return res;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserAuthenticatedSelector: (state) => state.isAuthenticated,
    getUserSelector: (state) => state.user,
    getUserIsAuthCheckedSelector: (state) => state.isAuthChecked,
    getRegisterErrorMessageSelector: (state) => state.registerError?.message,
    getLoginErrorMessageSelector: (state) => state.loginError?.message
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        //state.isAuthChecked = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.registerError = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loginError = null;
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
        state.error = null;
      })

      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      });
  }
});

export const {
  getUserSelector,
  getUserIsAuthCheckedSelector,
  getUserAuthenticatedSelector,
  getLoginErrorMessageSelector,
  getRegisterErrorMessageSelector
} = userSlice.selectors;
