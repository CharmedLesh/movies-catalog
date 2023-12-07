import { FC, InputHTMLAttributes, useState } from 'react';
import { Logger } from '../../../../services/logger/logger';
import { BorderedInputWithRightIcon } from '../../../../ui/inputs';
import { SvgOpenEyeIcon } from '../../../../ui/icons';
import styles from './password-input.module.scss';

interface IPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
    labelValue: string;
}

export const PasswordInput: FC<IPasswordInputProps> = (props) => {
    const { labelValue, placeholder, name, id } = props;
    const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password');

    const onEyeButtonClick = () => {
        switch (passwordInputType) {
            case 'password':
                setPasswordInputType('text');
                break;
            case 'text':
                setPasswordInputType('password');
                break;

            default:
                Logger.logError('Unexpected password input type.');
                break;
        }
    };

    return (
        <div className={styles.passwordInputWrapper}>
            <BorderedInputWithRightIcon
                useLabel={true}
                labelValue={labelValue}
                id={id}
                name={name}
                placeholder={placeholder}
                icon={<SvgOpenEyeIcon />}
                type={passwordInputType}
                onIconButtonClick={onEyeButtonClick}
            />
        </div>
    );
};
