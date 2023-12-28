import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './services/router/router';
import { store } from './services/store/store';
import { StatusNotificationBanner } from './components';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <div className="app">
            <StatusNotificationBanner />
            <RouterProvider router={router} />
        </div>
    </Provider>
);
