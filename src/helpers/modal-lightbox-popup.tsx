import { Root, createRoot } from 'react-dom/client';
import { Logger } from '../services/logger/logger';
import { ModalLightboxPopup } from '../components';

let rootContainer: HTMLElement | null = null;
let rootContainerInstance: Root | null = null;

export const showModalLightboxPopup = (content: JSX.Element) => {
    if (!rootContainer) {
        rootContainer = document.getElementById('modal-lightbox-popup-root');
    }

    if (rootContainer) {
        if (!rootContainerInstance) {
            rootContainerInstance = createRoot(rootContainer);
        }
        rootContainerInstance.render(<ModalLightboxPopup content={content} />);
    } else {
        Logger.logError('Popup root element not found. Check if element exists and id.');
    }
};

export const hideModalLightboxPopup = () => {
    if (rootContainerInstance) {
        rootContainerInstance.unmount();
        rootContainerInstance = null;
    } else {
        Logger.logError('Root nstance not found.');
    }
};
