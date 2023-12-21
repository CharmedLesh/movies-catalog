import { FC } from 'react';
import { useUser } from '../../../services/hooks/store-hooks';
import { RoundAvatar } from '../../../ui/avatars';
import styles from './overview-tab.module.scss';

export const OverviewTab: FC = () => {
    const { user } = useUser();

    const avatarImage = user?.avatar.tmdb.avatar_path ? (
        <img src={`https://www.themoviedb.org/t/p/w150_and_h150_face/${user.avatar.tmdb.avatar_path}`} />
    ) : null;

    return (
        <div className={styles.wrapper}>
            <div className={styles.landingData}>
                <div className={styles.avatarWrapper}>
                    {user?.avatar.tmdb.avatar_path && <RoundAvatar name={user?.username} img={avatarImage} />}
                </div>
                <div className={styles.essentialData}>
                    <p>{user?.name ? user.name : user?.username}</p>
                    <p>{user?.name && user.username}</p>
                    <p>ID: {user?.id}</p>
                </div>
            </div>
            <div className={styles.allData}>
                {user?.name && (
                    <p>
                        <span>Name:</span>
                        <span>{user.name}</span>
                    </p>
                )}
                {user?.username && (
                    <p>
                        <span>Username:</span>
                        <span>{user.username}</span>
                    </p>
                )}
                {user?.id && (
                    <p>
                        <span>ID:</span>
                        <span>{user.id}</span>
                    </p>
                )}
                {user?.iso_3166_1 && (
                    <p>
                        <span>Country:</span>
                        <span>{user.iso_3166_1}</span>
                    </p>
                )}
                {user?.iso_639_1 && (
                    <p>
                        <span>Language:</span>
                        <span>{user.iso_639_1}</span>
                    </p>
                )}
                {user?.include_adult !== undefined && (
                    <p>
                        <span>Adult content:</span>
                        {user.include_adult ? (
                            <span className={styles.adultAllowed}>Allowed</span>
                        ) : (
                            <span className={styles.adultNotAllowed}>Not allowed</span>
                        )}
                    </p>
                )}
            </div>
        </div>
    );
};
