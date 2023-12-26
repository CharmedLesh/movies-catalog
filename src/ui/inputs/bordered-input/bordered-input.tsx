import { FC, InputHTMLAttributes } from 'react';
import styles from './bordered-input.module.scss';

interface IBorderedInput extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
}

export const BorderedInput: FC<IBorderedInput> = (props) => {
    const { onChange, required, placeholder, id, useLabel, labelValue, type, name, spellCheck, autoComplete } = props;

    return (
        <div className={styles.borderedInputWrapper}>
            {useLabel && (
                <label className={styles.borderedInputLabel} htmlFor={id}>
                    {labelValue}
                </label>
            )}
            <input
                className={styles.borderedInput}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
                type={type}
                name={name}
                spellCheck={spellCheck}
            />
        </div>
    );
};
