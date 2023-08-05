import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import './styles/fonts.css'
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";
import store, {persistor} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import {VITE_CLIENT_ID} from "./keys.ts";

const rootElement = document.getElementById('root') as Element | DocumentFragment;

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(

        <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
        <React.StrictMode>
            <PersistGate loading={null} persistor={persistor}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </PersistGate>
        </React.StrictMode>
        </GoogleOAuthProvider>
    );
}
