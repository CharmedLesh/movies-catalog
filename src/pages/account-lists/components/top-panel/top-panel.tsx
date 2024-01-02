import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccentFilledRoundedButton } from '../../../../ui/buttons';
import styles from './top-panel.module.scss';

export const TopPanel: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pathPart = location.pathname.split('/')[3];

    const onActionButtonClickHandler = () => {
        if (pathPart === undefined) {
            navigate('/account/lists/create');
        } else {
            navigate('/account/lists');
        }
    };

    const actionButtonText = pathPart === undefined ? 'Create List' : 'Return to Lists';
    const titleText = pathPart === 'create' ? 'Create New List:' : pathPart === undefined ? 'My Lists:' : 'My List:';

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{titleText}</p>
            <AccentFilledRoundedButton value={actionButtonText} onClick={onActionButtonClickHandler} />
        </div>
    );
};
