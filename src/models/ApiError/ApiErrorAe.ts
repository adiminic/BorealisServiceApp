export class ApiErrorAe extends Error {
    cause: string;

    constructor(message: string, cause: string) {
        super(message); // Call the parent constructor with the message
        this.cause = cause;
        this.name = 'CustomError'; // Set the error name (optional)
    }
}