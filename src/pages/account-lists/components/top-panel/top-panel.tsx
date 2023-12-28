import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionId } from '../../../../services/hooks/store-hooks';
import { AccentFilledRoundedButton } from '../../../../ui/buttons';
import styles from './top-panel.module.scss';

interface ITopPanelProps {
    setIsCreateListFormOpen: (value: React.SetStateAction<boolean>) => void;
    isCreateListFormOpen: boolean;
}

export const TopPanel: FC<ITopPanelProps> = (props) => {
    const { setIsCreateListFormOpen, isCreateListFormOpen } = props;
    const { sessionId } = useSessionId();
    const navigate = useNavigate();

    const onActionButtonClickHandler = () => {
        if (!sessionId) {
            navigate(`/account`);
        }
        if (sessionId) {
            setIsCreateListFormOpen((prevState) => !prevState);
        }
    };

    const actionButtonText = isCreateListFormOpen ? 'Return To Lists' : 'Create List';
    const titleText = isCreateListFormOpen ? 'Create New List:' : 'My Lists:';

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>{titleText}</p>
            <AccentFilledRoundedButton value={actionButtonText} onClick={onActionButtonClickHandler} />
        </div>
    );
};
