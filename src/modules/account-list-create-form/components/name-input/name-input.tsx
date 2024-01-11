import { FC } from 'react';
import { BorderedInput } from '../../../../ui/inputs';

interface INameInputProps {
    setName: (value: React.SetStateAction<string>) => void;
    isPending: boolean;
}

export const NameInput: FC<INameInputProps> = (props) => {
    const { setName, isPending } = props;

    const nameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
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
    );
};
