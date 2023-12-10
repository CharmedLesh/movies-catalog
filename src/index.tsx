import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HeaderModule, FooterModule } from './modules';
import { HomePage, ErrorPage, SignInPage, SignUpPage, SessionPage } from './pages';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <div className="app">
            <HeaderModule />
            <div className="page-content-wrapper">
                <Routes>
                    <Route path="/" element={<Navigate to="/movies-catalog" />} />
                    <Route path="/movies-catalog" element={<HomePage />} />
                    <Route path="/movies-catalog/sign-in" element={<SignInPage />} />
                    <Route path="/movies-catalog/sign-up" element={<SignUpPage />} />
                    <Route path="/movies-catalog/session" element={<SessionPage />} />
                    <Route path="/movies-catalog/session/:approved" element={<SessionPage />} />
                    <Route path="*" element={<ErrorPage errorCode={404} />} />
                </Routes>
            </div>
            <FooterModule />
        </div>
    </BrowserRouter>
    // </React.StrictMode>
);
