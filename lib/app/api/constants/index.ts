import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_AUTH, API_AUTH_URL, API_JWT, API_REFRESH } from '../../../shared/constants/api.ts';
import { RootState } from '../../store/store.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setAccessToken, setRefreshToken, setUserData } from '../../store/slices/userSlice.ts';
import {TOAST_ERROR} from "../../../shared/constants/toasts.ts";

const baseQueryAuth = fetchBaseQuery({
  baseUrl: API_AUTH_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.access_token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryAuthWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQueryAuth(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const refreshResult = await fetch(API_AUTH_URL + API_AUTH + API_JWT + API_REFRESH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: (api.getState() as RootState).user.refresh_token }),
    });
    const refreshResJSON = await refreshResult.json();
    if (refreshResJSON && refreshResJSON.refresh_token && refreshResJSON.access_token) {
      console.log('%cTOKEN WAS SUCCESS UPDATED!', 'color: green');
      api.dispatch(setRefreshToken(refreshResJSON.refresh_token));
      api.dispatch(setAccessToken(refreshResJSON.access_token));
      result = await baseQueryAuth(args, api, extraOptions);
    } else {
      TOAST_ERROR('Ошибка верификации пользователя!');
      api.dispatch(setRefreshToken(null));
      api.dispatch(setAccessToken(null));
      api.dispatch(setUserData(null));
    }
  }

  return result;
};