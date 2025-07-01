/**
 * Domain code identifiers used across the enterprise data.
 */
export const ENTERPRISE_DOMAIN_CODES = {
  STUDENT_LEAVE_TYPE: 'STUD_LEAVE_TYPE',
  RESIDENCY_STATUS: 'RES_STATE',
  GENDER: 'GENDER',
  NATIONALITY: 'NATNLTY',
  BLOOD_GROUP: 'BLDGRP',
  MARITAL_STATUS: 'MRTLSTS',
  RELIGION: 'RELIGION',
} as const;
  
export type EnterpriseDomainCode =
  typeof ENTERPRISE_DOMAIN_CODES[keyof typeof ENTERPRISE_DOMAIN_CODES];
  