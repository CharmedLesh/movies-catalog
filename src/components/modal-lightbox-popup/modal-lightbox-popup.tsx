import { FC } from 'react';
import { hideModalLightboxPopup } from '../../helpers/modal-lightbox-popup';
import styles from './modal-lightbox-popup.module.scss';

interface IModalLightboxPopupProps {
    content: JSX.Element;
}

export const ModalLightboxPopup: FC<IModalLightboxPopupProps> = (props) => {
    const { content } = props;

    const onCloseButtonClick = () => {
        hideModalLightboxPopup();
    };

    return (
        <div id="modal-lightbox-popup" className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <button onClick={onCloseButtonClick}>X</button>
                {content}
            </div>
        </div>
    );
};
