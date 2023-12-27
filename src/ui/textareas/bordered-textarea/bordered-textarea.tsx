import { FC, TextareaHTMLAttributes } from 'react';
import styles from './bordered-textarea.module.scss';

interface IBorderedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    useLabel: boolean;
    labelValue?: string;
}

export const BorderedTextarea: FC<IBorderedTextareaProps> = (props) => {
    const {
        useLabel,
        labelValue,
        placeholder,
        id,
        onChange,
        required,
        cols,
        rows,
        name,
        minLength,
        maxLength,
        autoComplete,
        disabled
    } = props;

    return (
        <div className={styles.borderedTextareaWrapper}>
            {useLabel && (
                <label className={styles.borderedTextareaLabel} htmlFor={id}>
                    {labelValue}
                </label>
            )}
            <textarea
                className={styles.borderedTextarea}
                onChange={onChange}
                placeholder={placeholder}
                id={id}
                required={required}
                name={name}
                autoComplete={autoComplete}
                cols={cols}
                rows={rows}
                minLength={minLength}
                maxLength={maxLength}
                disabled={disabled}
            />
        </div>
    );
};
