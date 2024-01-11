import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../services/hooks/store-hooks';
import { setStatusNotificationState } from '../../../../services/store/slices/status-notification';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isEditable: boolean;
    listId: string;
    isPending: boolean;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isEditable, isPending, listId } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const actionButtonsConditionalClassName = isEditable ? styles.editable : styles.nonEditable;

    const onEditButtonClick = () => {
        navigate(`${pathname}/edit`);
    };

    const onShareButtonClick = async () => {
        const url = `${process.env.REACT_APP_URL_HOST}/list/${listId}`;
        try {
            await navigator.clipboard.writeText(url);
            dispatch(setStatusNotificationState({ isSuccess: true, message: 'Link copied to Clipboard' }));
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setStatusNotificationState({ isSuccess: true, message: error.message }));
            }
        }
    };

    return (
        <div className={`${styles.actionButtons} ${actionButtonsConditionalClassName}`}>
            {isEditable && <OutlinedRoundedButton value="Edit" onClick={onEditButtonClick} disabled={isPending} />}
            <OutlinedRoundedButton value="Sort By" onClick={() => console.log('click')} disabled={isPending} />
            <OutlinedRoundedButton value="Share" onClick={onShareButtonClick} disabled={isPending} />
        </div>
    );
};
