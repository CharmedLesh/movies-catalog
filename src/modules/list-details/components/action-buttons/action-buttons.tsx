import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { showStatusNotificationBanner } from '../../../../helpers/status-notification-banner';
import dataSortingOptions from '../../../../configs/data-sorting-options.json';
import { Iv4DataSortingOption, SortingTypeV4 } from '../../../../interfaces/shared.interfaces';
import { OutlinedRoundedButton } from '../../../../ui/buttons';
import { CenteredPointedDropdownMenu } from '../../../../ui/dropdown-menus';
import styles from './action-buttons.module.scss';

interface IActionButtonsProps {
    isEditable: boolean;
    listId: string;
    isPending: boolean;
    setSorting: React.Dispatch<React.SetStateAction<SortingTypeV4>>;
}

export const ActionButtons: FC<IActionButtonsProps> = (props) => {
    const { isEditable, isPending, listId, setSorting } = props;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onEditButtonClick = () => {
        navigate(`${pathname}/edit`);
    };

    const onShareButtonClick = async () => {
        const url = `${process.env.REACT_APP_URL_HOST}/list/${listId}`;
        try {
            await navigator.clipboard.writeText(url);
            showStatusNotificationBanner(true, 'Link copied to Clipboard');
        } catch (error) {
            if (error instanceof Error) {
                showStatusNotificationBanner(false, error.message);
            }
        }
    };

    const generateSortingMenuItems = (jsonData: Iv4DataSortingOption[]): JSX.Element[] => {
        const sortingMenuItemsArray: JSX.Element[] = jsonData.map((item, index) => {
            return (
                <button key={index} onClick={() => setSorting(item.code)}>
                    {item.title}
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
                    menuItems={generateSortingMenuItems(dataSortingOptions as Iv4DataSortingOption[])}
                />
            </div>
            <div className={styles.shareButton}>
                <OutlinedRoundedButton value="Share" onClick={onShareButtonClick} disabled={isPending} />
            </div>
        </div>
    );
};
