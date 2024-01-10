import { FC } from 'react';
import { useAppDispatch, useModalLightboxPopup } from '../../services/hooks/store-hooks';
import { dropModalLightboxPopupState } from '../../services/store/slices/modal-lightbox-popup-slice';
import styles from './modal-lightbox-popup.module.scss';

export const ModalLightboxPopup: FC = () => {
    const { content } = useModalLightboxPopup();
    const dispatch = useAppDispatch();

    const onCloseButtonClick = () => {
        dispatch(dropModalLightboxPopupState());
    };

    return content ? (
        <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
                <button onClick={onCloseButtonClick}>X</button>
                {content}
            </div>
        </div>
    ) : null;
};
