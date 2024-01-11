import { FC } from 'react';
import { useUser } from '../../../../services/hooks/store-hooks';
import { RoundAvatar } from '../../../../ui/avatars';
import { EssentialInfoLoader } from '../essential-info-loader/essential-info-loader';
import styles from './essential-info.module.scss';

export const EssentialInfo: FC = () => {
    const { user } = useUser();

    const avatarImage = user?.avatar.tmdb.avatar_path ? (
        <img src={`https://www.themoviedb.org/t/p/w150_and_h150_face/${user.avatar.tmdb.avatar_path}`} />
    ) : null;

    return (
        <div className={styles.wrapper}>
            {user ? (
                <>
                    <div className={styles.avatarWrapper}>
                        <RoundAvatar name={user?.username} img={avatarImage} />
                    </div>
                    <div className={styles.essentialInfo}>
                        <p>{user.username}</p>
                        {user.name && <p>{user.name}</p>}
                        <p>ID: {user.id}</p>
                    </div>
                </>
            ) : (
                <EssentialInfoLoader />
            )}
        </div>
    );
};
