/**
 * Career Experience Calculation Utility
 * Automatically computes professional years of experience starting from 2013.
 * Seamlessly increments every new calendar year (e.g., 2026 -> 13+, 2027 -> 14+).
 */
export const CAREER_START_YEAR = 2013;

export function getYearsOfExperience(): number {
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - CAREER_START_YEAR);
}

export function getYearsOfExperienceString(): string {
  return `${getYearsOfExperience()}+`;
}
