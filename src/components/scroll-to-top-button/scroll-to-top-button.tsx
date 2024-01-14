import { FC, useEffect, useState } from 'react';
import { SvgArrowUpIcon } from '../../ui/icons';
import styles from './scroll-to-top-button.module.scss';

export const ScrollToTopButton: FC = () => {
    const footerHeight = document.getElementsByTagName('footer')[0]
        ? document.getElementsByTagName('footer')[0].offsetHeight
        : 107;

    const [bottomGap, setBottomGap] = useState<number>(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // used to stay out of footer
    const handleScroll = () => {
        const { scrollHeight, clientHeight } = document.documentElement;
        const currentScrollPosition = window.scrollY + clientHeight;

        if (scrollHeight - currentScrollPosition < footerHeight) {
            const newBottomGap = footerHeight - (scrollHeight - currentScrollPosition);
            setBottomGap(newBottomGap);
        } else {
            setBottomGap(0);
        }
    };

    const scrollToTopClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className={styles.wrapper} style={{ bottom: bottomGap + 10 }} onClick={scrollToTopClickHandler}>
            <SvgArrowUpIcon />
        </button>
    );
};
