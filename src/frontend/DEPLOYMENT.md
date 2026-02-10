# Deployment Guide

This document describes how to build and deploy the GrowWithTutor application to the Internet Computer.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **pnpm** or **npm** (pnpm is preferred)
- **dfx** (Internet Computer SDK) - Install from [https://internetcomputer.org/docs/current/developer-docs/getting-started/install/](https://internetcomputer.org/docs/current/developer-docs/getting-started/install/)

## Fresh Checkout Build Steps

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install frontend dependencies**:
   ```bash
   cd frontend
   pnpm install
   # or: npm install
   cd ..
   ```

3. **Start local Internet Computer replica** (for local development):
   ```bash
   dfx start --clean --background
   ```

4. **Create and deploy canisters**:
   ```bash
   # Create canister IDs
   dfx canister create backend
   
   # Generate TypeScript bindings
   dfx generate backend
   
   # Deploy backend
   dfx deploy backend
   
   # Build and deploy frontend
   cd frontend
   pnpm run prebuild  # Regenerates bindings
   pnpm run build:skip-bindings
   cd ..
   dfx deploy frontend
   ```

## Deploy to IC Mainnet

To deploy to the Internet Computer mainnet:

1. **Ensure you have cycles** for deployment (required for mainnet)

2. **Deploy to mainnet**:
   ```bash
   dfx deploy --network ic
   ```

3. **Access your application** at the canister URL provided after deployment

## Changing the Domain

If you need to change the public domain/hostname for your application (e.g., from `growithtutor.com` to your own domain), follow these steps:

### 1. DNS Configuration

First, configure your DNS settings:
- Point your domain to the Internet Computer canister URL
- Set up appropriate CNAME or A records as required by your DNS provider
- If using a custom domain with Internet Computer, follow the [IC custom domains guide](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/)

### 2. Update React App Domain Configuration

The React application uses a centralized domain configuration:

**Primary configuration location**: `frontend/src/config/publicDomain.ts`

You have two options to change the domain:

**Option A: Environment Variable (Recommended)**
Set the `VITE_PUBLIC_DOMAIN` environment variable:
