import { FC } from 'react';
import styles from './info-item.module.scss';

interface IInfoItemProps {
    icon: JSX.Element;
    title: string;
    value: string;
    isBoolean?: boolean;
    booleanValue?: boolean;
}

export const InfoItem: FC<IInfoItemProps> = (props) => {
    const { icon, title, value, isBoolean, booleanValue } = props;

    const coloredInfoValueClassName = booleanValue ? styles.greenValue : styles.redValue;

    return (
        <div className={styles.wrapper}>
            {icon}
            {!isBoolean && (
                <div className={styles.info}>
                    <p>{title}</p>
                    <p>{value}</p>
                </div>
            )}
            {isBoolean && (
                <div className={styles.info}>
                    <p>{title}</p>
                    <p className={coloredInfoValueClassName}>{value}</p>
                </div>
            )}
        </div>
    );
};
