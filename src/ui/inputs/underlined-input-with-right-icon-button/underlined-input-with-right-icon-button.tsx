import { FC, InputHTMLAttributes } from 'react';
import { OnlyIconButton } from '../../buttons';
import { UnderlinedInput } from '../index';
import styles from './underlined-input-with-right-icon-button.module.scss';

interface IUnderlinedInputWithRightIcon extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
    icon: JSX.Element | string;
    onIconButtonClick: () => void;
}

export const UnderlinedInputWithRightIcon: FC<IUnderlinedInputWithRightIcon> = (props) => {
    const { icon, onIconButtonClick, useLabel, labelValue, onChange, required, placeholder, id, type } = props;

    return (
        <div className={styles.underlinedInputWithRightIconWrapper}>
            <UnderlinedInput
                useLabel={useLabel}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
                labelValue={labelValue}
                type={type}
            />
            <div className={styles.iconButtonContainer}>
                <OnlyIconButton icon={icon} onClick={onIconButtonClick} type="button" />
            </div>
        </div>
    );
};
