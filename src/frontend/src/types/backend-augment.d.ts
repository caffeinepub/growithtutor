/**
 * Type augmentation for backend actor interface.
 * This file extends the generated backend interface with internal methods
 * used by the authorization infrastructure that may not be exposed in the
 * standard Candid interface.
 */

import { backendInterface } from '../backend';

declare module '../backend' {
  interface backendInterface {
    /**
     * Internal method used by the authorization system to initialize
     * the first admin user. This is called automatically during actor
     * setup in useActor.ts.
     * @param adminToken - Secret token for admin initialization
     */
    _initializeAccessControlWithSecret(adminToken: string): Promise<void>;
  }
}
