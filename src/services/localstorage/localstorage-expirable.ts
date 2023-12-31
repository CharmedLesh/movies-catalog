import { Logger } from '../logger/logger';

export class LocalStorageExpirable<T> {
    private readonly prefix: string;
    private readonly key: string;
    private readonly expirationTimeInMinutes: number | null;

    constructor({ key, expirationTimeInMinutes }: { key: string; expirationTimeInMinutes: number | null }) {
        this.prefix = process.env.REACT_APP_LOCALSTORAGE_PREFIX
            ? process.env.REACT_APP_LOCALSTORAGE_PREFIX
            : 'MOVIES_CATALOG';
        this.key = `${this.prefix}_${key}`;
        this.expirationTimeInMinutes = expirationTimeInMinutes;
    }

    set(data: T): void {
        try {
            if (this.expirationTimeInMinutes) {
                const now = new Date();
                const expirationTime = now.getTime() + this.expirationTimeInMinutes * 60 * 1000;
                localStorage.setItem(this.key, JSON.stringify({ data, expirationTime }));
            } else {
                throw new Error('Unable to set expirable data without expiration time provided');
            }
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
            if (!data) {
                return null;
            }
            const parsedData: { data: T; expirationTime: number } = JSON.parse(data);
            const now = new Date();
            if (now.getTime() > parsedData.expirationTime) {
                this.remove();
                return null;
            }
            return parsedData.data;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            } else {
                Logger.logError('Unexpected error occurred.');
            }
            return null;
        }
    }

    getAndUpdate(): T | null {
        try {
            const data = localStorage.getItem(this.key);
            if (!data) {
                return null;
            }
            const parsedData: { data: T; expirationTime: number } = JSON.parse(data);
            const now = new Date();
            if (now.getTime() > parsedData.expirationTime) {
                this.remove();
                return null;
            } else {
                this.set(parsedData.data);
                return parsedData.data;
            }
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            } else {
                Logger.logError('Unexpected error occurred.');
            }
            return null;
        }
    }

    remove(): void {
        localStorage.removeItem(this.key);
    }

    check(): boolean {
        try {
            const data = localStorage.getItem(this.key);
            if (!data) {
                return false;
            }
            const parsedData: { data: T; expirationTime: number } = JSON.parse(data);
            const now = new Date();
            if (now.getTime() > parsedData.expirationTime) {
                this.remove();
                return false;
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                Logger.logError(error.message);
            } else {
                Logger.logError('Unexpected error occurred.');
            }
            return false;
        }
    }
}
