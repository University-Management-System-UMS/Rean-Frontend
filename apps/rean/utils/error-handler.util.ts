import { TranslationPath } from '@/hooks/useTranslation';
import axios from 'axios';

export interface ApiError {
    message: string;
    statusCode?: number;
    translationKey?: TranslationPath;
    serverMessage?: string;
  }
  
  export function handleApiError(error: unknown): ApiError {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
  
        switch (status) {
          case 400:
            return { 
              message: 'Bad Request', 
              statusCode: 400,
              translationKey: 'error.invalidRequest',
              serverMessage: data?.message 
            };
          case 401:
            return { 
              message: 'Unauthorized', 
              statusCode: 401,
              translationKey: 'error.unauthorized',
              serverMessage: data?.message 
            };
          case 404:
            return { 
              message: 'Not Found', 
              statusCode: 404,
              translationKey: 'error.notFound',
              serverMessage: data?.message 
            };
          case 500:
            return { 
              message: 'Server Error', 
              statusCode: 500,
              translationKey: 'error.serverError',
              serverMessage: data?.message 
            };
          default:
            return { 
              message: 'Unexpected Error', 
              statusCode: status,
              translationKey: 'error.unexpectedError',
              serverMessage: data?.message 
            };
        }
      } else if (error.request) {
        return { 
          message: 'No Response',
          translationKey: 'error.noResponse' 
        };
      }
    }
  
    return { 
      message: 'Something went wrong',
      translationKey: 'error.somethingWentWrong' 
    };
  }
  