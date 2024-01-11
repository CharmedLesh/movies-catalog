import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isEditable: boolean;
    isPending: boolean;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isEditable, isPending } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const actionButtonsConditionalClassName = isEditable ? styles.editable : styles.nonEditable;

    return (
        <div className={`${styles.actionButtons} ${actionButtonsConditionalClassName}`}>
            {isEditable && (
                <OutlinedRoundedButton value="Edit" onClick={() => navigate(`${pathname}/edit`)} disabled={isPending} />
            )}
            <OutlinedRoundedButton value="Sort By" onClick={() => console.log('click')} disabled={isPending} />
            <OutlinedRoundedButton value="Share" onClick={() => console.log('click')} disabled={isPending} />
        </div>
    );
};
