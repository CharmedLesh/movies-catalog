// unused for now
import { Logger } from '../logger/logger';

export class LocalStorage<T> {
    private readonly PREFIX = process.env.REACT_APP_LOCALSTORAGE_PREFIX;
    private readonly key: string;

    constructor({ key }: { key: string }) {
        this.key = `${this.PREFIX}_${key}`;
    }

    set(data: T): void {
        try {
            localStorage.setItem(this.key, JSON.stringify(data));
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            } else {
                Logger.logError('Unexpected error occurred.');
            }
        }
    }

    get(): T | null {
        try {
            const data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            } else {
                Logger.logError('Unexpected error occurred.');
            }
            return null;
        }
    }
}
