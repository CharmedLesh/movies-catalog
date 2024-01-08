import { FC } from 'react';
import externalLinksData from '../../../../configs/external-links.json';
import { ActionButton } from '../action-button/action-button';
import styles from './disclaimer.module.scss';

interface IDisclaimerProps {
    actionButton: JSX.Element;
}

export const Disclaimer: FC<IDisclaimerProps> = (props) => {
    const { actionButton } = props;

    const onTmdbClickHandler = () => {
        window.open(externalLinksData.tmdb.url, '_blank');
    };

    const onTermsOfUseClickHandler = () => {
        window.open(externalLinksData.tmdb_terms_of_use.url, '_blank');
    };

    const onPrivacyPolicyClickHandler = () => {
        window.open(externalLinksData.tmdb_terms_of_use.url, '_blank');
    };

    return (
        <div className={styles.disclaimer}>
            <p className={styles.firstParagraph}>
                Before you proceed, please note that our platform relies on data provided by{' '}
                {<ActionButton value="The Movie Database" onClick={onTmdbClickHandler} />}. To access certain features
                and personalized content, you will be redirected to the API provider's authorization page.
            </p>
            <p>By signing in to account, you agree to the following:</p>
            <ul>
                <li>You will be redirected to the API provider for authentication purposes.</li>
                <li>
                    The API provider may require you to sign in or create an account on their platform to grant
                    necessary permissions.
                </li>
                <li>We will only access and use the information needed to enhance your experience on our platform.</li>
            </ul>
            <p>
                Please review the API provider's{' '}
                {<ActionButton value="terms of use" onClick={onTermsOfUseClickHandler} />} and{' '}
                {<ActionButton value="privacy policy" onClick={onPrivacyPolicyClickHandler} />} before proceeding. If
                you have any concerns or questions, feel free to contact our support team.
            </p>
            <span>By clicking {actionButton} you acknowledge and accept these terms.</span>
        </div>
    );
};
