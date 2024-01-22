import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../services/hooks/store-hooks';
import { setStatusNotificationState } from '../../../../services/store/slices/status-notification';
import dataSortingOptions from '../../../../configs/data-sorting-options.json';
import { IDataSortingOptions } from '../../../../interfaces/shared.interfaces';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import { CenteredPointedDropdownMenu } from '../../../../ui/dropdown-menus';
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

    const generateSortingMenuItems = (jsonData: IDataSortingOptions): JSX.Element[] => {
        const sortingMenuItemsArray: JSX.Element[] = Object.keys(jsonData).map((key, index) => {
            const itemData = jsonData[key];

            return (
                <button key={index} onClick={() => console.log(itemData.code)}>
                    {itemData.title}
                </button>
            );
        });

        return sortingMenuItemsArray;
    };

    const actionButtonsConditionalClassName = isEditable ? styles.editable : styles.nonEditable;

    return (
        <div className={actionButtonsConditionalClassName}>
            {isEditable && (
                <div className={styles.editButton}>
                    <OutlinedRoundedButton value="Edit" onClick={onEditButtonClick} disabled={isPending} />
                </div>
            )}
            <div className={styles.sortingMenu}>
                <CenteredPointedDropdownMenu
                    triggerElement={<OutlinedRoundedButton value="Sort By" disabled={isPending} />}
                    menuItems={generateSortingMenuItems(dataSortingOptions)}
                />
            </div>
            <div className={styles.shareButton}>
                <OutlinedRoundedButton value="Share" onClick={onShareButtonClick} disabled={isPending} />
            </div>
        </div>
    );
};

// todo
// image resize on hover for 2-3 cards
