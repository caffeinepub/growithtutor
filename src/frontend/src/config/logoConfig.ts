/**
 * Centralized Logo Configuration
 * 
 * This is the SINGLE source of truth for the application's logo URL.
 * 
 * To change the logo:
 * 1. Set the VITE_LOGO_URL environment variable (e.g., in .env or build config)
 * 2. Or update the fallback value below
 * 
 * The logo URL can point to:
 * - An external URL (e.g., https://yourdomain.com/path/to/logo.png)
 * - A local asset path (e.g., /assets/logo.png) - recommended for canister deployments
 * - A domain-relative path (will use the configured public domain)
 */

import { getPublicAssetUrl } from './publicDomain';

/**
 * Get the logo URL for the application.
 * Priority:
 * 1. VITE_LOGO_URL environment variable (explicit override)
 * 2. Local asset path (works with canister deployments)
 * 3. Domain-relative path (for custom domains with external hosting)
 */
export function getLogoUrl(): string {
  // Check for environment variable first (explicit override)
  if (import.meta.env.VITE_LOGO_URL) {
    return import.meta.env.VITE_LOGO_URL;
  }
  
  // Default to local asset path (works with canister deployments)
  // This path is relative to the frontend canister's root
  const localLogoPath = '/assets/generated/growwithtutor-logo.dim_512x192.png';
  
  // Check if we're using a custom domain (VITE_PUBLIC_DOMAIN is set)
  // If so, construct full URL; otherwise use local path
  if (import.meta.env.VITE_PUBLIC_DOMAIN) {
    // Custom domain: use external URL
    const externalLogoPath = '/wp-content/uploads/2025/08/cropped-cropped-growithtutor-3d-new-logo-150x150.png';
    return getPublicAssetUrl(externalLogoPath);
  }
  
  // Default: use local asset (works for canister URLs)
  return localLogoPath;
}

// Export the current logo URL as a constant for convenience
export const LOGO_URL = getLogoUrl();
