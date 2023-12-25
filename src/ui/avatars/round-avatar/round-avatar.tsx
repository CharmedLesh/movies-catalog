import { FC } from 'react';
import styles from './round-avatar.module.scss';

interface IRoundAvatarProps {
    img: JSX.Element | null;
    name?: string | null;
}

export const RoundAvatar: FC<IRoundAvatarProps> = (props) => {
    const { img, name } = props;

    const imageContent: string | JSX.Element = img ? img : name ? name.charAt(0) : '?';

    return <div className={styles.roundAvatar}>{imageContent}</div>;
};
