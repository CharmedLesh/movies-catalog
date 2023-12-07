import { FC, InputHTMLAttributes } from 'react';
import { OnlyIconButton } from '../../buttons';
import { BorderedInput } from '../index';
import styles from './bordered-input-with-right-icon-button.module.scss';

interface IBorderedInputWithRightIcon extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
    icon: JSX.Element | string;
    onIconButtonClick: () => void;
}

export const BorderedInputWithRightIcon: FC<IBorderedInputWithRightIcon> = (props) => {
    const { icon, onIconButtonClick, useLabel, labelValue, onChange, required, placeholder, id, type } = props;

    return (
        <div className={styles.borderedInputWithRightIconWrapper}>
            <BorderedInput
                useLabel={useLabel}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
                labelValue={labelValue}
                type={type}
            />
            <div className={styles.eyeIconButtonContainer}>
                <OnlyIconButton icon={icon} onClick={onIconButtonClick} type="button" />
            </div>
        </div>
    );
};
