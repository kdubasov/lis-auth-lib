import React, {useEffect} from 'react';
import styles from './UserInfo.module.css';
import {useLazyGetMeQuery, useLogOutMutation} from "../../../app/api";
import {useAuthUser} from "../../../shared/hooks/useAuthUser.ts";
import {TOAST_ERROR, TOAST_SUCCESS} from "../../../shared/constants/toasts.ts";

export const UserInfo: React.FC = () => {

   const [ getMe ] = useLazyGetMeQuery();
   const [ logOut, { isLoading: loadLogout } ] = useLogOutMutation();
   const {
      setUserData,
      userData,
      refresh_token,
      clearUser,
      access_token,
   } = useAuthUser();

   const handleLogout = () => {
      if (!refresh_token) return;
      logOut({ refresh_token: refresh_token })
         .unwrap()
         .then(() => {
            TOAST_SUCCESS('Вы вышли из аккаунта!');
            clearUser();
         })
         .catch(() => TOAST_ERROR('Ошибка выхода из аккаунта!'));
   };

   useEffect(() => {
      if (userData || !access_token) return;
      getMe('')
         .unwrap()
         .then((res) => setUserData(res))
         .catch(() => {
            TOAST_ERROR('Ошибка загрузки пользователя!');
         });
      //eslint-disable-next-line
   }, [userData, access_token]);

   if (!access_token) {
      return (
         <div className={`${styles.wrapper} ${styles.load}`}>
            <p>Не авторизован</p>
         </div>
      )
   }

   if (!userData) {
      return (
         <div className={`${styles.wrapper} ${styles.load}`}>
            <p>Загрузка пользователя...</p>
         </div>
      )
   }

   return (
      <div className={styles.wrapper}>
         <ul>
            <li>Email: <b>{userData.email}</b></li>
            <li>Login: <b>{userData.login}</b></li>
            <li>Name: <b>{userData.name}</b></li>
            <li>Role: <b>{userData.roles?.[0]?.name?.toUpperCase()}</b></li>
         </ul>
         <button onClick={handleLogout} disabled={loadLogout} className={styles.logout}>
            Выйти
         </button>
      </div>
   );
};