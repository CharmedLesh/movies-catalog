import { FC, useEffect } from 'react';
import { hideModalLightboxPopup } from '../../helpers/modal-lightbox-popup';
import { OnlyIconButton } from '../../ui/buttons';
import { SvgCloseIcon } from '../../ui/icons';
import styles from './modal-lightbox-popup.module.scss';

interface IModalLightboxPopupProps {
    content: JSX.Element;
}

export const ModalLightboxPopup: FC<IModalLightboxPopupProps> = (props) => {
    const { content } = props;

    useEffect(() => {
        // freeze body scroll when popup mounts
        document.body.classList.add('scroll-freeze');

        // unfreeze body scroll when popup unmounts
        return () => {
            document.body.classList.remove('scroll-freeze');
        };
    }, []);

    const onCloseButtonClick = () => {
        hideModalLightboxPopup();
    };

    return (
        <div id="modal-lightbox-popup" className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <OnlyIconButton onClick={onCloseButtonClick} icon={<SvgCloseIcon />} />
                <div className={styles.content}>{content}</div>
            </div>
        </div>
    );
};
