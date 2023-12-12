import { AxiosError } from 'axios';

export class Logger {
    static logError(message: string): void {
        console.error(`Error: ${message}`);
    }

    static logInfo(message: string): void {
        console.info(`Info: ${message}`);
    }

    static logAxiosError(error: AxiosError) {
        const message = error.message;
        if (message) {
            console.error(`Error: ${message}`);
        } else {
            console.error('Unexpected axios error occured');
        }
    }
}
