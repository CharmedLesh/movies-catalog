import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconInCircleExternalRedirectButton } from '../../../../ui/buttons/icon-in-circle-external-redirect-button/icon-in-circle-external-redirect-button';
import { SvgGithubIcon, SvgInstagramIcon, SvgLinkedinIcon, SvgYoutubeIcon } from '../../../../ui/icons';
import externalLinksData from '../../../../constants/external-links.json';
import styles from './media-links.module.scss';

export const MediaLinks: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.mediaLinks}>
            <IconInCircleExternalRedirectButton
                icon={<SvgGithubIcon />}
                href={externalLinksData.github.url}
                rel={externalLinksData.github.rel}
                title={externalLinksData.github.title}
                target="_blank"
            />
            <IconInCircleExternalRedirectButton
                icon={<SvgLinkedinIcon />}
                href={externalLinksData.linkedin.url}
                rel={externalLinksData.linkedin.rel}
                title={externalLinksData.linkedin.title}
                target="_blank"
            />
            <IconInCircleExternalRedirectButton
                icon={<SvgInstagramIcon />}
                href={externalLinksData.instagram.url}
                rel={externalLinksData.instagram.rel}
                title={externalLinksData.instagram.title}
                target="_blank"
            />
            <IconInCircleExternalRedirectButton
                icon={<SvgYoutubeIcon />}
                href={externalLinksData.youtube.url}
                rel={externalLinksData.youtube.rel}
                title={externalLinksData.youtube.title}
                target="_blank"
            />
        </div>
    );
};
