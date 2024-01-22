import { useEffect, FC, useState } from 'react';
import { hideStatusNotificationBanner } from '../../helpers/status-notification-banner';
import styles from './status-notification-banner.module.scss';

interface IStatusNotificationBannerProps {
    isSuccess: boolean;
    message: string;
}

export const StatusNotificationBanner: FC<IStatusNotificationBannerProps> = (props) => {
    const { isSuccess, message } = props;

    const [isMounted, setIsMounted] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isMounted) {
            if (!isHovered) {
                timer = setTimeout(() => {
                    setIsMounted(false);
                }, 5000);
            }
        }
        return () => clearTimeout(timer);
    }, [isMounted, isHovered]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!shouldRender) {
            timer = setTimeout(() => {
                hideStatusNotificationBanner();
            });
        }

        return () => clearTimeout(timer);
    }, [shouldRender]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isMounted && shouldRender) {
            timer = setTimeout(() => setShouldRender(false), 200);
        }

        return () => clearTimeout(timer);
    }, [isMounted, shouldRender]);

    const bannerStatusClassName = isSuccess ? styles.bannerGreen : styles.bannerRed;
    const bannerRenderClassName = isMounted ? styles.bannerMounted : styles.bannerUnmounted;

    return (
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
    );
};
