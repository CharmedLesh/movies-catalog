import { ButtonHTMLAttributes, FC } from 'react';
import { FilledButton } from '../../../../ui/buttons';

export const SubmitButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const { onClick } = props;

    return <FilledButton onClick={onClick} value={'SIGN IN'} />;
};
