import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorPage } from './pages/error/error-page';
import { HomePage } from './pages/home/home-page';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="*" element={<ErrorPage errorCode={404} />} />
                </Routes>
            </div>
        </BrowserRouter>
    </React.StrictMode>
);
