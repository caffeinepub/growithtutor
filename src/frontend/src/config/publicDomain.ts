/**
 * Centralized Public Domain Configuration
 * 
 * This is the SINGLE source of truth for the application's public domain/hostname.
 * 
 * To change the domain:
 * 1. Set the VITE_PUBLIC_DOMAIN environment variable (e.g., in .env or build config)
 * 2. Or update the fallback value below
 * 
 * This configuration is used for:
 * - External asset URLs (logos, images hosted on the domain)
 * - Self-referential links
 * - UTM tracking parameters
 * 
 * Note: For the standalone landing page, see frontend/static/growwithtutor-standalone/index.html
 */

/**
 * Get the public domain/hostname for this application.
 * Priority:
 * 1. VITE_PUBLIC_DOMAIN environment variable
 * 2. window.location.hostname (runtime fallback)
 * 3. Default fallback value
 */
export function getPublicDomain(): string {
  // Check for environment variable first
  if (import.meta.env.VITE_PUBLIC_DOMAIN) {
    return import.meta.env.VITE_PUBLIC_DOMAIN;
  }
  
  // Runtime fallback to current hostname
  if (typeof window !== 'undefined') {
    return window.location.hostname;
  }
  
  // Default fallback (update this if needed)
  return 'growithtutor.com';
}

/**
 * Get the full public URL (with protocol) for this application.
 * Defaults to https:// protocol.
 */
export function getPublicUrl(protocol: 'https' | 'http' = 'https'): string {
  return `${protocol}://${getPublicDomain()}`;
}

/**
 * Construct a full URL to an asset hosted on the public domain.
 * @param path - The path to the asset (should start with /)
 */
export function getPublicAssetUrl(path: string): string {
  const domain = getPublicDomain();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `https://${domain}${cleanPath}`;
}

// Export the current domain as a constant for convenience
export const PUBLIC_DOMAIN = getPublicDomain();
export const PUBLIC_URL = getPublicUrl();
