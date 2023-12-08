import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderModule, FooterModule } from './modules';
import { HomePage, ErrorPage, SignInPage, SignUpPage } from './pages';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="app">
                <HeaderModule />
                <div className="page-content-wrapper">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                        <Route path="*" element={<ErrorPage errorCode={404} />} />
                    </Routes>
                </div>
                <FooterModule />
            </div>
        </BrowserRouter>
    </React.StrictMode>
);
