export function extractErrorMessage(error: unknown, t?: (key: string) => string): string {
    const msg =
      error instanceof Error ? error.message :
      typeof error === "string" ? error :
      "Unknown error occurred";
  
    // Optionally map to translated version
    if (t) {
      return t(msg) || t("somethingWentWrong");
    }
  
    return msg;
  }
  