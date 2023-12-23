import { FC } from 'react';
import { useUser } from '../../../../services/hooks/store-hooks';
import { RoundAvatar } from '../../../../ui/avatars';
import { SvgCountryIcon, SvgLanguageIcon, SvgUserIcon, SvgAdultIcon } from '../../../../ui/icons';
import styles from './overview-tab.module.scss';

export const OverviewTab: FC = () => {
    const { user } = useUser();

    const avatarImage = user?.avatar.tmdb.avatar_path ? (
        <img src={`https://www.themoviedb.org/t/p/w150_and_h150_face/${user.avatar.tmdb.avatar_path}`} />
    ) : null;

    return (
        <div>
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
                    <div className={styles.infoContainer}>
                        <SvgUserIcon />
                        <div className={styles.info}>
                            <p>Name:</p>
                            <p>{user.name}</p>
                        </div>
                    </div>
                )}
                {user?.username && (
                    <div className={styles.infoContainer}>
                        <SvgUserIcon />
                        <div className={styles.info}>
                            <p>Username:</p>
                            <p>{user.username}</p>
                        </div>
                    </div>
                )}
                {user?.id && (
                    <div className={styles.infoContainer}>
                        <SvgUserIcon />
                        <div className={styles.info}>
                            <p>ID:</p>
                            <p>{user.id}</p>
                        </div>
                    </div>
                )}
                {user?.iso_3166_1 && (
                    <div className={styles.infoContainer}>
                        <SvgCountryIcon />
                        <div className={styles.info}>
                            <p>Country:</p>
                            <p>{user.iso_3166_1}</p>
                        </div>
                    </div>
                )}
                {user?.iso_639_1 && (
                    <div className={styles.infoContainer}>
                        <SvgLanguageIcon />
                        <div className={styles.info}>
                            <p>Language:</p>
                            <p>{user.iso_639_1}</p>
                        </div>
                    </div>
                )}
                {user?.include_adult !== undefined && (
                    <div className={styles.infoContainer}>
                        <SvgAdultIcon />
                        <div className={styles.info}>
                            <p>Adult content:</p>
                            {user.include_adult ? (
                                <p className={styles.adultAllowed}>Allowed</p>
                            ) : (
                                <p className={styles.adultNotAllowed}>Not allowed</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
