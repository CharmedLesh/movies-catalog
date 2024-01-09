import { FC } from 'react';
import { SimpleToggleSwitch } from '../../../../ui/toggle-switchs';
import styles from './privacy-toggle-switch.module.scss';

interface IPrivacyToggleSwitchProps {
    isPublic: boolean;
    setIsPublic: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PrivacyToggleSwitch: FC<IPrivacyToggleSwitchProps> = (props) => {
    const { isPublic, setIsPublic } = props;

    const labelText = isPublic ? 'Public' : 'Private';

    return (
        <div className={styles.wrapper}>
            <p>{labelText}</p>
            <SimpleToggleSwitch
                isChecked={isPublic}
                setIsChecked={setIsPublic}
                id="privacy-toggle-switch"
                colors="green-grey"
                size="normal"
            />
        </div>
    );
};
