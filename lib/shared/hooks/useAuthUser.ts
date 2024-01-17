import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
import {setAccessToken, setRefreshToken, setUserData} from "../../app/store/slices/userSlice.ts";
import {IUser} from "../types";


export const useAuthUser = () => {
  const { refresh_token, access_token, userData } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return {
    refresh_token,
    access_token,
    userData,
    setRefreshToken: (value: string | null) => dispatch(setRefreshToken(value)),
    setAccessToken: (value: string | null) => dispatch(setAccessToken(value)),
    setUserData: (value: IUser | null) => dispatch(setUserData(value)),
    clearUser: () => {
      dispatch(setRefreshToken(null));
      dispatch(setAccessToken(null));
      dispatch(setUserData(null));
    },
  };
};
