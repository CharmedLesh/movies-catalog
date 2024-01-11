import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSession, useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { NameInput } from './components/name-input/name-input';
import { DescriptionTextarea } from './components/description-textarea/description-textarea';
import { SubmitButton } from './components/submit-button/submit-button';
import { PrivacyToggleSwitch } from './components/privacy-toggle-switch/privacy-toggle-switch';
import styles from './index.module.scss';

export const AccountListCreateForm: FC = () => {
    const { isSession, accessToken } = useSession();
    const { user } = useUser();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(true);
    const [isPending, setIsPending] = useState<boolean>(false);

    const onSubmitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (isSession && accessToken && user) {
            const createdListData = await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.createList(accessToken, name, description, user.iso_3166_1, user.iso_639_1, isPublic),
                setIsPending,
                true,
                { success: 'List created' }
            );

            if (createdListData && createdListData.success && createdListData.id) {
                navigate(`/account/lists/${createdListData.id}`);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.createListForm} id="new-list-form" onSubmit={(event) => onSubmitHandler(event)}>
                <NameInput setName={setName} isPending={isPending} />
                <DescriptionTextarea setDescription={setDescription} isPending={isPending} />
                <PrivacyToggleSwitch isPublic={isPublic} setIsPublic={setIsPublic} />
                <SubmitButton isPending={isPending} />
            </form>
        </div>
    );
};
