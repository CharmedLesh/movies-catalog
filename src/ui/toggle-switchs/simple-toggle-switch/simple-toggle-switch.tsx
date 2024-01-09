import { FC } from 'react';
import styles from './simple-toggle-switch.module.scss';

interface ISimpleToggleSwitchProps {
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    colors?: 'grey' | 'green-grey' | 'green-red';
    size?: 'mini' | 'small' | 'normal' | 'big';
}

export const SimpleToggleSwitch: FC<ISimpleToggleSwitchProps> = (props) => {
    const { isChecked, setIsChecked, id, colors, size } = props;

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

    const getLabelConditionalSizeClassName = (): string | null => {
        switch (size) {
            case 'normal':
                return null;
            case 'mini':
                return styles.miniLabel;
            case 'small':
                return styles.smallLabel;
            case 'big':
                return styles.bigLabel;
            default:
                break;
        }
        return null;
    };

    const getButtonConditionalSizeClassName = (): string | null => {
        switch (size) {
            case 'normal':
                return null;
            case 'mini':
                return styles.miniButton;
            case 'small':
                return styles.smallButton;
            case 'big':
                return styles.bigButton;
            default:
                break;
        }
        return null;
    };

    const labelConditionalColorClassName: string | null = getLabelConditionalColorClassName();
    const labelConditionalSizeClassName: string | null = getLabelConditionalSizeClassName();
    const buttonConditionalSizeClassName: string | null = getButtonConditionalSizeClassName();

    const labelClassName =
        labelConditionalColorClassName && labelConditionalSizeClassName
            ? `${styles.toggleSwitchLabel} ${labelConditionalColorClassName} ${labelConditionalSizeClassName}`
            : labelConditionalColorClassName
            ? `${styles.toggleSwitchLabel} ${labelConditionalColorClassName}`
            : labelConditionalSizeClassName
            ? `${styles.toggleSwitchLabel} ${labelConditionalSizeClassName}`
            : styles.toggleSwitchLabel;

    const buttonClassName = buttonConditionalSizeClassName
        ? `${styles.toggleSwitchButton} ${buttonConditionalSizeClassName}`
        : styles.toggleSwitchButton;

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
                <span className={buttonClassName} />
            </label>
        </>
    );
};
