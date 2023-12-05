import { FC } from "react";
import styles from "./index.module.scss";

interface IErrorModuleProps {
    errorDescription: string;
    errorInfo: string;
}

export const ErrorModule: FC<IErrorModuleProps> = (props) => {
    const { errorDescription, errorInfo } = props;

    return (
        <div className={styles.errorModule}>
            <h1>Oops!</h1>
            <p>{errorDescription}</p>
            <p>
                <i>{errorInfo}</i>
            </p>
        </div>
    );
};
