import React, {FormEvent, useState} from 'react';
import {useSignInMutation} from "../../../app/api";
import {TOAST_ERROR, TOAST_WARNING} from "../../../shared/constants/toasts.ts";
import {useAuthUser} from "../../../shared/hooks/useAuthUser.ts";
import styles from './SignInForm.module.css';

export const SignInForm: React.FC = () => {

   const [formData, setFormData] = useState({
      username: '',
      password: '',
   });

   const {
      setAccessToken,
      setRefreshToken,
      userData,
      refresh_token,
      access_token,
   } = useAuthUser();
   const [signIn, { isLoading }] = useSignInMutation();

   const handleLogin = (e: FormEvent) => {
      e.preventDefault();

      if (!formData.username || !formData.password) {
         TOAST_WARNING('Введите логин и пароль!');
         return;
      }

      signIn(formData)
         .unwrap()
         .then((res) => {
            if (res?.access_token) {
               setAccessToken(res.access_token);
               setRefreshToken(res.refresh_token);
            } else {
               TOAST_WARNING(`Ошибка авторизации ${res?.detail || ''}`);
            }
         })
         .catch((err) => {
            TOAST_ERROR(`Ошибка авторизации! ${err?.data?.detail ? err?.data?.detail : ''}`);
            console.log(err);
         })
         .finally(() => setFormData({ username: '', password: '' }));
   };

   if (userData || (refresh_token && access_token)) {
      return (
         <div className={`${styles.wrapper} ${styles.load}`}>
            <p>Вы уже вошли в аккаунт</p>
         </div>
      )
   }

   return (
      <form className={styles.wrapper} onSubmit={handleLogin}>
         <input
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
            placeholder={'Введите логин'}
            required
         />
         <input
            type={'password'}
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            placeholder={'Введите пароль'}
            required
         />
         <button type={'submit'} disabled={isLoading} className={styles.submit}>
            {isLoading ? 'Загрузка...' : 'Отправить'}
         </button>
      </form>
   );
};