import { FC, InputHTMLAttributes } from 'react';
import styles from './slightly-rounded-input.module.scss';

interface ISlightlyRoundedInput extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
}

export const SlightlyRoundedInput: FC<ISlightlyRoundedInput> = (props) => {
    const { onChange, required, placeholder, id, useLabel, labelValue } = props;

    return (
        <div className={styles.slightlyRoundedInputWrapper}>
            {useLabel && <label htmlFor={id}>{labelValue}</label>}
            <input
                className={styles.slightlyRoundedInput}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
            />
        </div>
    );
};
