type ErrorProps = {
    code: string,
    message: string,
    options?: { cause?: unknown }
}

export class ApplicationError extends Error {
    public readonly code: string;

    constructor({
        code,
        message,
        options
    }: ErrorProps) {
        super(message, options);
        this.name = 'ApplicationError';
        this.code = code;
    }
}

export function isApplicationError(error: unknown): error is ApplicationError {
    return error instanceof ApplicationError;
}

export function toAppError(error: unknown): { code: string; message: string } {
    if (isApplicationError(error)) {
        return { code: error.code, message: error.message };
    }
    return { code: "internalError", message: "予期せぬエラーが発生しました。" };
}