import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IUser} from "../../../shared/types";

interface IUserSlice {
  refresh_token: null | string;
  access_token: null | string;
  userData: null | IUser;
}

const initialState: IUserSlice = {
  refresh_token: null,
  access_token: null,
  userData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRefreshToken: (state, action: PayloadAction<null | string>) => {
      state.refresh_token = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<null | string>) => {
      state.access_token = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUser | null>) => {
      state.userData = action.payload;
    },
  },
});

export const { setRefreshToken, setAccessToken, setUserData } = userSlice.actions;
export default userSlice.reducer;
