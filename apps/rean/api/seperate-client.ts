// apps/rean/api/clients.ts
import HttpClient from './http-client';

export const reanHttpClient = new HttpClient('https://test.rean.gov.kh');
export const universityHttpClient = new HttpClient('https://test.university.gov.kh');