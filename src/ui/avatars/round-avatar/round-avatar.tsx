import { FC } from 'react';
import styles from './round-avatar.module.scss';

interface IRoundAvatarProps {
    img: JSX.Element | null;
    name: string;
}

export const RoundAvatar: FC<IRoundAvatarProps> = (props) => {
    const { img, name } = props;

    return <div className={styles.roundAvatar}>{img ? img : name.charAt(0)}</div>;
};
