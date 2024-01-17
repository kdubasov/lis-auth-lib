import React from 'react';
import {Provider} from "react-redux";
import store, { persistedStore } from '../store/store.ts';
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer} from "react-toastify";

//css
import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';

export const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistedStore}>

            <ToastContainer
               position={'bottom-left'}
               autoClose={5000}
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
            />

            {children}
         </PersistGate>
      </Provider>
   );
};