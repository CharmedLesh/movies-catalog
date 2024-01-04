import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSessionId, useUser } from '../../services/hooks/store-hooks';
import { ListsPromises } from '../../services/api/promises';
import { requestWithNotificationsAndPendingSetter } from '../../helpers/requests';
import { BorderedInput } from '../../ui/inputs';
import { BorderedTextarea } from '../../ui/textareas';
import { DarkGreyFilledButton } from '../../ui/buttons';
import styles from './create-list-form.module.scss';

export const CreateListForm: FC = () => {
    const { sessionId } = useSessionId();
    const { user } = useUser();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isPending, setIsPending] = useState<boolean>(false);

    const nameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const descriptionTextareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const onSubmitHandler = async (event: SyntheticEvent, sessionId: string | null) => {
        event.preventDefault();

        if (!sessionId || !user) {
            // todo
            // check sessionId not expired
            navigate(`/account`);
        }
        if (sessionId && user) {
            await requestWithNotificationsAndPendingSetter(
                dispatch,
                ListsPromises.createList(sessionId, name, description, user.iso_639_1),
                setIsPending,
                true,
                { success: 'List created' }
            );
        }
    };

    return (
        <div className={styles.wrapper}>
            <form
                className={styles.createListForm}
                id="new-list-form"
                onSubmit={(event) => onSubmitHandler(event, sessionId)}
            >
                <BorderedInput
                    useLabel={true}
                    labelValue="Name:"
                    required={true}
                    placeholder="Give a name for your list..."
                    id="new-list-name"
                    type="text"
                    name="new-list-name"
                    spellCheck={false}
                    autoComplete="off"
                    onChange={nameInputChangeHandler}
                    disabled={isPending}
                />
                <BorderedTextarea
                    useLabel={true}
                    labelValue="Description:"
                    required={false}
                    placeholder="Describe your list..."
                    id="new-list-description"
                    name="new-list-description"
                    autoComplete="off"
                    rows={4}
                    onChange={descriptionTextareaChangeHandler}
                    disabled={isPending}
                />
                <DarkGreyFilledButton value="Create" disabled={isPending} />
            </form>
        </div>
    );
};
