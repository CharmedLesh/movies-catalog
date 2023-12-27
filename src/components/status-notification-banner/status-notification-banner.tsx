import { useEffect, FC, useState } from 'react';
import { useDelayUnmount } from '../../services/hooks/delay-unmount';
import { useAppDispatch, useStatusNotification } from '../../services/hooks/store-hooks';
import { dropStatusNotificationState } from '../../services/store/slices/status-notification';
import styles from './status-notification-banner.module.scss';

export const StatusNotificationBanner: FC = () => {
    const { isSuccess, message } = useStatusNotification();
    const dispatch = useAppDispatch();

    const [isMounted, setIsMounted] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const shouldRender = useDelayUnmount(isMounted, 500);

    useEffect(() => {
        if (isSuccess !== null && message) {
            setIsMounted(true);
        }
    }, [isSuccess, message]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isMounted) {
            if (!isHovered) {
                timer = setTimeout(() => {
                    setIsMounted(false);
                }, 3000);
            }
            return () => {
                clearTimeout(timer);
            };
        }
    }, [isMounted, isHovered]);

    useEffect(() => {
        if (!shouldRender) {
            dispatch(dropStatusNotificationState());
        }
    }, [shouldRender]);

    const bannerStatusClassName = isSuccess ? styles.bannerGreen : styles.bannerRed;
    const bannerRenderClassName = isMounted ? styles.bannerMounted : styles.bannerUnmounted;

    return isSuccess !== null && message && shouldRender ? (
        <div
            className={`${bannerStatusClassName} ${bannerRenderClassName}`}
            onMouseEnter={() => {
                setIsHovered(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
            }}
        >
            {message}
        </div>
    ) : null;
};
