/**
 * Centralized site/hosting name configuration
 * Change SITE_NAME to update the brand name throughout the entire application
 */
export const SITE_NAME = 'Growithtutor';

/**
 * Helper function to generate page titles with the site name
 */
export function getPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`;
}

/**
 * Helper function to get the site name for use in content
 */
export function getSiteName(): string {
  return SITE_NAME;
}
