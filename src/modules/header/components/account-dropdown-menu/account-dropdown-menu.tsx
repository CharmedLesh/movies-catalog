import { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../../../services/hooks/store-hooks';
import { RoundAvatar } from '../../../../ui/avatars';
import { CenteredPointedDropdownMenu } from '../../../../ui/dropdown-menus';
import styles from './account-dropdown-menu.module.scss';

export const AccountDropdownMenu: FC = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const avatarImage = user?.avatar.tmdb.avatar_path ? (
        <img src={`https://www.themoviedb.org/t/p/w150_and_h150_face/${user.avatar.tmdb.avatar_path}`} />
    ) : null;

    const navigateToAccountPage = () => {
        navigate(`${process.env.REACT_APP_URL_PATHNAME_CORE}/account`);
    };

    return (
        <CenteredPointedDropdownMenu
            triggerElement={
                <button className={styles.accountDropdownAvatarButton} onClick={navigateToAccountPage}>
                    {user && <RoundAvatar name={user?.username} img={avatarImage} />}
                </button>
            }
            menuItems={[
                <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/account`}>{user?.username}</Link>,
                <Link to={`${process.env.REACT_APP_URL_PATHNAME_CORE}/watchlist`}>Watchlist</Link>,
                <button>Sign Out</button>
            ]}
        />
    );
};
