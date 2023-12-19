import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './services/store/store';
import { Logger } from './services/logger/logger';
import { HeaderModule, FooterModule } from './modules';
import { HomePage, ErrorPage, AccountPage } from './pages';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const urlPathname = process.env.REACT_APP_URL_PATHNAME_CORE;

// fix required: check if /sign-in/:approved has specific patern, otherwise redirect to /sign-in
const generateRoutes = () => {
    if (urlPathname) {
        return (
            <Routes>
                <Route path="/" element={<Navigate to={urlPathname} />} />
                <Route path={urlPathname} element={<HomePage />} />
                <Route path={`${urlPathname}/account`} element={<AccountPage />}>
                    <Route path={`${urlPathname}/account/:approved`} element={<AccountPage />} />
                </Route>
                <Route path="*" element={<ErrorPage errorCode={404} />} />
            </Routes>
        );
    }

    Logger.logError('Enviroment variable not found.');
};

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <div className="app">
                <HeaderModule />
                <div className="page-content-wrapper">{generateRoutes()}</div>
                <FooterModule />
            </div>
        </Provider>
    </BrowserRouter>
);
