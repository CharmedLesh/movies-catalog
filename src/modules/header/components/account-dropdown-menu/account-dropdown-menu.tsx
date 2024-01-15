import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../../services/hooks/store-hooks';
import { RoundAvatar } from '../../../../ui/avatars';
import { CenteredPointedDropdownMenu } from '../../../../ui/dropdown-menus';
import styles from './account-dropdown-menu.module.scss';

interface IAccountDropdownMenuProps {
    signOutHandler: () => void;
}

export const AccountDropdownMenu: FC<IAccountDropdownMenuProps> = (props) => {
    const { signOutHandler } = props;
    const { user } = useUser();

    const avatarImage = user?.avatar.tmdb.avatar_path ? (
        <img src={`https://www.themoviedb.org/t/p/w50_and_h50_face${user.avatar.tmdb.avatar_path}`} />
    ) : null;

    return (
        <CenteredPointedDropdownMenu
            triggerElement={
                <button className={styles.accountDropdownAvatarButton}>
                    {user && <RoundAvatar name={user?.username} img={avatarImage} />}
                </button>
            }
            menuItems={[
                <Link to={`/account`}>{user?.username ? user.username : 'Account'}</Link>,
                <Link to={`/account/lists`}>Lists</Link>,
                <Link to={`/account/watchlist`}>Watchlist</Link>,
                <Link to={`/account/rated`}>Rated</Link>,
                <Link to={`/account/favorites`}>Favorites</Link>,
                <button onClick={signOutHandler}>Sign Out</button>
            ]}
        />
    );
};
