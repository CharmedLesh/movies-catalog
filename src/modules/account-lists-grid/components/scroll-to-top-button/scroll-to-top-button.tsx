import { FC, useEffect, useState } from 'react';
import { SvgArrowUpIcon } from '../../../../ui/icons';
import styles from './scroll-to-top-button.module.scss';

interface IScrollToTopButtonProps {
    footerHeight: number;
}

export const ScrollToTopButton: FC<IScrollToTopButtonProps> = (props) => {
    const { footerHeight } = props;

    const [bottomGap, setBottomGap] = useState<number>(0);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button className={styles.scroll} style={{ bottom: bottomGap + 10 }} onClick={scrollToTop}>
            <SvgArrowUpIcon />
        </button>
    );
};
