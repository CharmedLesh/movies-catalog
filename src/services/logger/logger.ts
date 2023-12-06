export class Logger {
    static logError(message: string): void {
        console.error(`Error: ${message}`);
    }

    static logInfo(message: string): void {
        console.info(`Info: ${message}`);
    }
}
