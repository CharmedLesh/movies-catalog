import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilledRoundedButton } from '../../../../ui/buttons';
import styles from './top-panel.module.scss';

export const TopPanel: FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const onActionButtonClickHandler = () => {
        switch (pathname) {
            case '/account/lists':
                navigate('/account/lists/create');
                break;
            case '/account/lists/create':
                navigate('/account/lists');
                break;
            default:
                navigate('/account/lists');
                break;
        }
    };

    const actionButtonText = pathname === '/account/lists' ? 'Create List' : 'Return to Lists';
    const titleText =
        pathname === '/account/lists/create'
            ? 'Create New List:'
            : pathname === '/account/lists'
            ? 'My Lists:'
            : 'My List:';

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{titleText}</p>
            <FilledRoundedButton value={actionButtonText} onClick={onActionButtonClickHandler} />
        </div>
    );
};
