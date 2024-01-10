import { FC } from 'react';
import styles from './simple-toggle-switch.module.scss';

interface ISimpleToggleSwitchProps {
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    colors?: 'grey' | 'green-grey' | 'green-red';
}

export const SimpleToggleSwitch: FC<ISimpleToggleSwitchProps> = (props) => {
    const { isChecked, setIsChecked, id, colors } = props;

    const onToggleSwitchChangeHandler = () => {
        setIsChecked((prevState) => !prevState);
    };

    const getLabelConditionalColorClassName = (): string | null => {
        switch (colors) {
            case 'grey':
                return null;
            case 'green-grey':
                return isChecked ? styles.greenLabel : null;
            case 'green-red':
                return isChecked ? styles.greenLabel : styles.redLabel;
            default:
                break;
        }
        return null;
    };

    const labelConditionalColorClassName: string | null = getLabelConditionalColorClassName();
    const labelClassName = labelConditionalColorClassName
        ? `${styles.toggleSwitchLabel} ${labelConditionalColorClassName}`
        : styles.toggleSwitchLabel;

    return (
        <>
            <input
                checked={isChecked}
                onChange={onToggleSwitchChangeHandler}
                className={styles.toggleSwitchCheckbox}
                id={id}
                type="checkbox"
            />
            <label className={labelClassName} htmlFor={id}>
                <span className={styles.toggleSwitchButton} />
            </label>
        </>
    );
};
