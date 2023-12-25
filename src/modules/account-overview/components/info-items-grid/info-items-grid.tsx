import { useUser } from '../../../../services/hooks/store-hooks';
import { SvgAdultIcon, SvgCountryIcon, SvgLanguageIcon, SvgUserIcon } from '../../../../ui/icons';
import { InfoItem } from '../info-item/info-item';
import styles from './info-items-grid.module.scss';

export const InfoItemsGrid = () => {
    const { user } = useUser();

    return (
        <div className={styles.grid}>
            {user?.name && <InfoItem icon={<SvgUserIcon />} title="Name:" value={user.name} />}
            {user?.username && <InfoItem icon={<SvgUserIcon />} title="Username:" value={user.username} />}
            {user?.id && <InfoItem icon={<SvgUserIcon />} title="ID:" value={user.id.toString()} />}
            {user?.iso_3166_1 && <InfoItem icon={<SvgCountryIcon />} title="Country:" value={user.iso_3166_1} />}
            {user?.iso_639_1 && <InfoItem icon={<SvgLanguageIcon />} title="Language:" value={user.iso_639_1} />}
            {user?.include_adult && (
                <InfoItem
                    icon={<SvgAdultIcon />}
                    title="Adult content:"
                    value={user.include_adult ? 'Allowed' : 'Not Allowed'}
                    isBoolean={true}
                    booleanValue={!user.include_adult}
                />
            )}
        </div>
    );
};
