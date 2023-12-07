import { FC } from 'react';
import { ErrorModule } from '../../modules';

interface IErrorPageProps {
    errorCode: number;
}

export const ErrorPage: FC<IErrorPageProps> = (props) => {
    const { errorCode } = props;

    const getPropperErrorModule = () => {
        switch (errorCode) {
            case 404:
                return ErrorModule({
                    errorDescription: 'Sorry, page you are looking for doesn`t exist.',
                    errorInfo: 'Not Found'
                });
            default:
                return ErrorModule({
                    errorDescription: 'Sorry, an unexpected error has occurred.',
                    errorInfo: 'Unexpected Error'
                });
        }
    };

    return getPropperErrorModule();
};
