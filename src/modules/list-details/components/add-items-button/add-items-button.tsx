import { FC } from 'react';
import { FilledRoundedButton } from '../../../../ui/buttons';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './add-items-button.module.scss';

export const AddItemsButton: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const addItemsButtonClickHandler = () => {
        navigate(`${pathname}/edit/items`);
    };

    return (
        <div className={styles.wrapper}>
            <FilledRoundedButton value="ADD ITEM" onClick={addItemsButtonClickHandler} />
        </div>
    );
};
