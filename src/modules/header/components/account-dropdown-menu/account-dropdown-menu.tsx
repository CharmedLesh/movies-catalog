import { FC } from 'react';
import { NavLink } from 'react-router-dom';
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
        <div className={styles.wrapper}>
            <CenteredPointedDropdownMenu
                triggerElement={
                    <button className={styles.accountDropdownAvatarButton}>
                        {user && <RoundAvatar name={user?.username} img={avatarImage} />}
                    </button>
                }
                menuItems={[
                    <NavLink to={`/account`}>{user?.username ? user.username : 'Account'}</NavLink>,
                    <NavLink to={`/account/lists`}>Lists</NavLink>,
                    <NavLink to={`/account/watchlist`}>Watchlist</NavLink>,
                    <NavLink to={`/account/rated`}>Rated</NavLink>,
                    <NavLink to={`/account/favorites`}>Favorites</NavLink>,
                    <button onClick={signOutHandler}>Sign Out</button>
                ]}
            />
        </div>
    );
};
