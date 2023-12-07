import { FC, useState } from 'react';
import { Logger } from '../../../../services/logger/logger';
import { BorderedInputWithRightIcon } from '../../../../ui/inputs';
import { SvgOpenEyeIcon } from '../../../../ui/icons';

export const PasswordInput: FC = () => {
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
        <BorderedInputWithRightIcon
            useLabel={true}
            labelValue="Password"
            id="sign-in-password-input"
            placeholder="Enter your password here..."
            icon={<SvgOpenEyeIcon />}
            type={passwordInputType}
            onIconButtonClick={onEyeButtonClick}
        />
    );
};
