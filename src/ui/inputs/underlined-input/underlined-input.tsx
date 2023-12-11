import { FC, InputHTMLAttributes } from 'react';
import styles from './underlined-input.module.scss';

interface IUnderlinedInput extends InputHTMLAttributes<HTMLInputElement> {
    useLabel: boolean;
    labelValue?: string;
}

export const UnderlinedInput: FC<IUnderlinedInput> = (props) => {
    const { onChange, required, placeholder, id, useLabel, labelValue, type, name, spellCheck } = props;

    return (
        <div className={styles.underlinedInputWrapper}>
            {useLabel && (
                <label className={styles.underlinedInputLabel} htmlFor={id}>
                    {labelValue}
                </label>
            )}
            <input
                className={styles.underlinedInput}
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
