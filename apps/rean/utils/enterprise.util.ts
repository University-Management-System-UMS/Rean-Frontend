import { CCode, Domain } from "@/api/types/all-interprise";

/**
 * Get options from a specific domain code.
 */
export const getDomainOptions = (
  domains: Domain[] | undefined,
  targetCode: string
): { label: string; value: string }[] => {
  return (
    domains
      ?.find((d) => d.code === targetCode)
      ?.ccodes?.filter((code) => code.StFl === 'A')
      ?.map((code) => ({
        label: code.text,
        value: code.code,
      })) || []
  );
};

/**
 * Get raw domain object by its code.
 */
export const getDomainByCode = (
  domains: Domain[] | undefined,
  targetCode: string
): Domain | undefined => {
  return domains?.find((d) => d.code === targetCode);
};

/**
 * Get active ccodes from a domain by code.
 */
export const getActiveCcodes = (
  domains: Domain[] | undefined,
  targetCode: string
): CCode[] => {
  return (
    domains
      ?.find((d) => d.code === targetCode)
      ?.ccodes?.filter((code) => code.StFl === 'A') || []
  );
};


