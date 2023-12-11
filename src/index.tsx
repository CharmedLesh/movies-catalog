import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store/store';
import { HeaderModule, FooterModule } from './modules';
import { HomePage, ErrorPage, SignInPage } from './pages';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <div className="app">
                <HeaderModule />
                <div className="page-content-wrapper">
                    <Routes>
                        <Route path="/" element={<Navigate to="/movies-catalog" />} />
                        <Route path="/movies-catalog" element={<HomePage />} />
                        <Route path="/movies-catalog/sign-in" element={<SignInPage />} />
                        <Route path="/movies-catalog/sign-in/:approved" element={<SignInPage />} />
                        <Route path="*" element={<ErrorPage errorCode={404} />} />
                    </Routes>
                </div>
                <FooterModule />
            </div>
        </Provider>
    </BrowserRouter>
);
