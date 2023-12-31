import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccentFilledRoundedButton } from '../../../../ui/buttons';
import styles from './top-panel.module.scss';

export const TopPanel: FC = () => {
    const navigate = useNavigate();

    const getSubpage = () => {
        const pathParts = window.location.pathname.split('/');
        console.log(pathParts[3]);

        switch (pathParts[3]) {
            case 'create':
                return 'create';
            case undefined:
                return 'lists';
            default:
                return 'list';
        }
    };

    const [subpage, setSubpage] = useState<'lists' | 'create' | 'list'>(getSubpage());

    const onActionButtonClickHandler = () => {
        switch (subpage) {
            case 'lists':
                setSubpage('create');
                navigate('/account/lists/create');
                break;
            case 'create':
                setSubpage('lists');
                navigate('/account/lists');
                break;
            default:
                break;
        }
    };

    const wrapperClassName = subpage === 'list' ? styles.hidden : styles.wrapper;
    const actionButtonText = subpage === 'lists' ? 'Create List' : subpage === 'create' ? 'Return To Lists' : '';
    const titleText =
        subpage === 'lists' ? 'My Lists:' : subpage === 'create' ? 'Create New List:' : subpage === 'list' && 'List:';

    return (
        <div className={wrapperClassName}>
            <p className={styles.title}>{titleText}</p>
            <AccentFilledRoundedButton value={actionButtonText} onClick={onActionButtonClickHandler} />
        </div>
    );
};
