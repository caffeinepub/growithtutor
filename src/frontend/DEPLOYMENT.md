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

## Unpublishing / Maintenance Mode

The application includes a maintenance mode feature that allows admins to temporarily make the site unavailable to public visitors while keeping admin access intact.

### How It Works

- When maintenance mode is enabled, public visitors see a maintenance screen instead of the normal site content
- Admin routes (e.g., `/admin/blogs`, `/admin/setup`) remain fully accessible to authenticated admins
- This is an **application-level** feature, not a network-level rollback
- The backend canister remains deployed and running; only the public-facing UI is affected

### Enabling Maintenance Mode (Taking Site Offline / Unpublishing)

1. **Log in as an admin** using Internet Identity
2. **Navigate to the admin panel**: Go to `/admin/blogs`
3. **Find the "Site Status Control" card** at the top of the page
4. **Click "Take Site Offline / Unpublish"** button or toggle the switch to "Offline"
5. **Confirm the action** in the dialog that appears
6. **Success**: You'll see a confirmation message, and public routes will now show the maintenance screen

### Re-enabling the Site (Going Live / Publishing)

1. **Log in as an admin** using Internet Identity
2. **Navigate to the admin panel**: Go to `/admin/blogs`
3. **Find the "Site Status Control" card** at the top of the page
4. **Click "Bring Site Online / Publish"** button or toggle the switch to "Live"
5. **Success**: You'll see a confirmation message, and public routes will be accessible again

### Important Notes

- **Not a rollback**: This feature does not roll back your canister deployment on the Internet Computer network. It only controls whether public visitors can access the site content.
- **Admin access preserved**: Admins can always access admin routes, even when the site is in maintenance mode.
- **State persists**: All data (blogs, user profiles, etc.) remains intact during maintenance mode.
- **Automatic on upgrade**: After a backend upgrade, the site defaults to "live" status unless explicitly set to maintenance mode.

## Changing the Domain

If you need to change the public domain/hostname for your application (e.g., from `growithtutor.com` to your own domain), follow these steps:

### 1. DNS Configuration (External)

First, configure your DNS settings:
- Point your domain to the Internet Computer canister URL
- Set up appropriate CNAME or A records as required by your DNS provider
- If using a custom domain with Internet Computer, follow the [IC custom domains guide](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/)

### 2. Update React App Domain Configuration

The React application uses a centralized domain configuration system. You have two options to change the domain:

#### Option A: Environment Variable (Recommended)

Set the `VITE_PUBLIC_DOMAIN` environment variable before building:

