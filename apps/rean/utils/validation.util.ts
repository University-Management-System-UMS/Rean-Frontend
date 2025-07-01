export interface ValidationRule {
  validate: (value: unknown) => boolean;
  message: string;
}

export class ValidationUtil {
  static email(value: string): boolean {
    return /\S+@\S+\.\S+/.test(value);
  }

  static required(value: unknown): boolean {
    return value !== undefined && value !== null && value !== '';
  }
}