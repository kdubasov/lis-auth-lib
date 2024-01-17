import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryAuthWithReauth } from '../constants';
import {API_AUTH, API_JWT, API_LOGIN, API_LOGOUT, API_ME, API_USERS} from "../../../shared/constants/api.ts";
import {IUser} from "../../../shared/types";

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryAuthWithReauth,
  endpoints: (builder) => ({
    getMe: builder.query<IUser, string>({
      query: (query) => API_USERS + API_ME + query,
    }),
    signIn: builder.mutation({
      query: (body: { username: string; password: string }) => ({
        url: API_AUTH + API_JWT + API_LOGIN,
        method: 'POST',
        body: new URLSearchParams({
          'username': body.username,
          'password': body.password,
        }),
      }),
    }),
    logOut: builder.mutation({
      query: (body: { refresh_token: string; }) => ({
        url: API_AUTH + API_JWT + API_LOGOUT,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export default authApi;
