import { Root, createRoot } from 'react-dom/client';
import { Logger } from '../services/logger/logger';
import { StatusNotificationBanner } from '../components';

let rootContainer: HTMLElement | null = null;
let rootContainerInstance: Root | null = null;

export const showStatusNotificationBanner = (isSuccess: boolean, message: string) => {
    if (!rootContainer) {
        rootContainer = document.getElementById('status-notification-banner-root');
    }

    if (rootContainer) {
        if (!rootContainerInstance) {
            rootContainerInstance = createRoot(rootContainer);
        }
        rootContainerInstance.render(<StatusNotificationBanner isSuccess={isSuccess} message={message} />);
    } else {
        Logger.logError('Status notification banner root element not found. Check if element exists and id.');
    }
};

export const hideStatusNotificationBanner = () => {
    if (rootContainerInstance) {
        rootContainerInstance.unmount();
        rootContainerInstance = null;
    } else {
        Logger.logError('Status notification banner root instance not found.');
    }
};
