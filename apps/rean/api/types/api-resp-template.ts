export interface BaseApiResponse<T = unknown> {
    output: {
        data: T;
        errors: unknown;
    };
}