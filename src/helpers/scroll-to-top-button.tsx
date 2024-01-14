import { Root, createRoot } from 'react-dom/client';
import { Logger } from '../services/logger/logger';
import { ScrollToTopButton } from '../components';

let rootContainer: HTMLElement | null = null;
let rootContainerInstance: Root | null = null;

export const showScrollToTopButton = () => {
    if (!rootContainer) {
        rootContainer = document.getElementById('scroll-to-top-button-root');
    }

    if (rootContainer) {
        if (!rootContainerInstance) {
            rootContainerInstance = createRoot(rootContainer);
        }
        rootContainerInstance.render(<ScrollToTopButton />);
    } else {
        Logger.logError('Scroll to top button root element not found. Check if element exists and id.');
    }
};

export const hideScrollToTopButton = () => {
    if (rootContainerInstance) {
        rootContainerInstance.unmount();
        rootContainerInstance = null;
    }
};
