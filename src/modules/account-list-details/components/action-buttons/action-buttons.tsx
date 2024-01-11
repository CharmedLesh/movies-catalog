import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isPending: boolean;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isPending } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className={styles.actionButtons}>
            <OutlinedRoundedButton value="Edit" onClick={() => navigate(`${pathname}/edit`)} disabled={isPending} />
            <OutlinedRoundedButton value="Sort By" onClick={() => console.log('click')} disabled={isPending} />
            <OutlinedRoundedButton value="Share" onClick={() => console.log('click')} disabled={isPending} />
        </div>
    );
};
