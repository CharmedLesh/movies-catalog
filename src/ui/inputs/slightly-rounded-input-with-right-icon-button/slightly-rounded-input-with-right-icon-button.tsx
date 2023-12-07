import { FC, InputHTMLAttributes } from 'react';
import { OnlyIconButton } from '../../buttons/only-icon-button/only-icon-button';
import styles from './slightly-rounded-input-with-right-icon-button.module.scss';

interface ISlightlyRoundedInputWithRightIcon extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
    icon: JSX.Element | string;
    onIconButtonClick: () => void;
}

export const SlightlyRoundedInputWithRightIcon: FC<ISlightlyRoundedInputWithRightIcon> = (props) => {
    const { icon, onIconButtonClick, useLabel, labelValue, onChange, required, placeholder, id } = props;

    return (
        <div className={styles.slightlyRoundedInputWithRightIconWrapper}>
            {useLabel && <label htmlFor={id}>{labelValue}</label>}
            <input
                className={styles.slightlyRoundedInputWithRightIcon}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
            />
            <OnlyIconButton icon={icon} onClick={onIconButtonClick} />
        </div>
    );
};
