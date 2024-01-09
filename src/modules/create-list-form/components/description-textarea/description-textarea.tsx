import { FC } from 'react';
import { BorderedTextarea } from '../../../../ui/textareas';

interface IDescriptionTextareaProps {
    setDescription: (value: React.SetStateAction<string>) => void;
    isPending: boolean;
}

export const DescriptionTextarea: FC<IDescriptionTextareaProps> = (props) => {
    const { setDescription, isPending } = props;

    const descriptionTextareaChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    return (
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
    );
};
