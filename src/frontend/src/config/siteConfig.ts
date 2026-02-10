/**
 * Centralized Site Configuration
 * 
 * This file contains the core site/hosting name and branding configuration.
 * 
 * To change the site name:
 * - Update the SITE_NAME constant below
 * 
 * To change the public domain/hostname:
 * - See frontend/src/config/publicDomain.ts
 * - Set VITE_PUBLIC_DOMAIN environment variable or update the fallback there
 * 
 * For the standalone landing page domain:
 * - See frontend/static/growwithtutor-standalone/index.html
 */

/**
 * The display name of the site/application.
 * This is used throughout the UI for branding.
 */
export const SITE_NAME = 'Growithtutor';

/**
 * Generate a page title with the site name.
 * @param pageTitle - The specific page title (e.g., "About Us")
 * @returns Full page title (e.g., "About Us | Growithtutor")
 */
export function getPageTitle(pageTitle: string): string {
  return `${pageTitle} | ${SITE_NAME}`;
}

/**
 * Get the site name for use in components.
 * @returns The site name
 */
export function getSiteName(): string {
  return SITE_NAME;
}
