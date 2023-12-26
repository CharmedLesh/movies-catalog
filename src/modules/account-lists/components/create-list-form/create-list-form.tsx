import { FC, SyntheticEvent } from 'react';
import { BorderedInput } from '../../../../ui/inputs';
import { BorderedTextarea } from '../../../../ui/textareas';
import { DarkGreyFilledButton } from '../../../../ui/buttons';
import styles from './create-list-form.module.scss';

export const CreateListForm: FC = () => {
    const onSubmitHandler = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.createListForm} id="new-list-form" onSubmit={onSubmitHandler}>
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
                />
                <DarkGreyFilledButton value="Create" />
            </form>
        </div>
    );
};
