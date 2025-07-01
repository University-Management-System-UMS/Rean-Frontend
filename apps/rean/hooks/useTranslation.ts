/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLanguage } from "@/contexts/language.context";
import * as enTranslations from "@/translations/en";
import * as khTranslations from "@/translations/kh";

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;
export type TranslationPath = Path<typeof enTranslations.en>;

export function useTranslation() {
  const { language } = useLanguage();
  const translations =
    language === "en" ? enTranslations.en : khTranslations.en;

  const t = (key: TranslationPath) => {
    const keys = (key as string).split('.');
    let result: any = translations;
    
    try {
      for (const k of keys) {
        if (result === undefined || result === null) {
          console.warn(`Translation key "${key}" resulted in undefined path`);
          return key;
        }
        if (!(k in result)) {
          console.warn(`Translation key "${key}" not found`);
          return key;
        }
        result = result[k];
      }
      
      return result || key;
    } catch (error) {
      console.warn(`Error accessing translation for key "${key}"`, error);
      return key;
    }
  };

  return { t };
}
