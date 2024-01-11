import { FC } from 'react';
import { DarkGreyFilledButton } from '../../../../ui/buttons';

interface ISubmitButtonProps {
    isPending: boolean;
}
export const SubmitButton: FC<ISubmitButtonProps> = (props) => {
    const { isPending } = props;

    return <DarkGreyFilledButton value="Create" disabled={isPending} />;
};
