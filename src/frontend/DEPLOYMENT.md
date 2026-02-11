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

## Promote Version 30 to Production (Mainnet)

To deploy your application to the Internet Computer mainnet (production):

### Prerequisites

1. **Ensure you have cycles** for deployment:
   - Mainnet deployments require cycles (the "gas" of the Internet Computer)
   - You can obtain cycles through the [NNS dapp](https://nns.ic0.app/) or cycles faucet
   - Check your cycles balance: `dfx wallet --network ic balance`

2. **Verify your identity**:
   ```bash
   dfx identity whoami
   dfx identity get-principal
   ```

### Deployment Steps

1. **Deploy to mainnet** (both backend and frontend):
   ```bash
   dfx deploy --network ic
   ```

   This command will:
   - Deploy the backend canister to mainnet
   - Build the frontend with production optimizations
   - Deploy the frontend canister to mainnet

2. **Find your canister URLs** after deployment:
   
   The deployment output will show URLs like:
   ```
   Frontend canister via browser:
     frontend: https://<canister-id>.ic0.app/
   
   Backend canister via Candid interface:
     backend: https://<canister-id>.ic0.app/?id=<backend-canister-id>
   ```

   You can also retrieve URLs anytime with:
   ```bash
   dfx canister --network ic id frontend
   dfx canister --network ic id backend
   ```

   Your app will be accessible at: `https://<frontend-canister-id>.ic0.app/`
   (Also available via `.icp0.io` and `.raw.ic0.app` domains)

### Post-Deploy Verification

After deploying to mainnet, verify that everything works correctly:

1. **Open the home page**:
   - Navigate to `https://<frontend-canister-id>.ic0.app/`
   - Verify the page loads without errors
   - Check that the logo, images, and styling appear correctly

2. **Test public navigation**:
   - Navigate to `/blogs` and verify published blog posts are visible
   - Test the student and teacher forms
   - Verify the contact page works

3. **Verify admin access control**:
   - Navigate to `/admin/blogs` (or any admin route)
   - Confirm you're prompted to log in with Internet Identity
   - After logging in, verify you can access the admin panel
   - Test creating/editing/publishing blog posts

4. **Check maintenance mode** (optional):
   - In the admin panel, test taking the site offline
   - Verify public routes show the maintenance screen
   - Confirm admin routes remain accessible

### Important Notes

- **Production deployments do not expire**: Unlike draft apps on Caffeine, mainnet deployments remain live indefinitely (as long as the canisters have cycles)
- **Cycles management**: Monitor your canister cycles balance and top up as needed to keep your app running
- **Custom domains**: The app works out-of-the-box with canister URLs (*.ic0.app). To use a custom domain, see the "Changing the Domain" section below
- **Updates**: To update your production app, simply run `dfx deploy --network ic` again with your changes

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

If you need to change the public domain/hostname for your application (e.g., from the default canister URL to your own custom domain), follow these steps:

### 1. DNS Configuration (External)

First, configure your DNS settings:
- Point your domain to the Internet Computer canister URL
- Set up appropriate CNAME or A records as required by your DNS provider
- If using a custom domain with Internet Computer, follow the [IC custom domains guide](https://internetcomputer.org/docs/current/developer-docs/production/custom-domain/)

### 2. Update React App Domain Configuration

The React application uses a centralized domain configuration system. You have two options to change the domain:

#### Option A: Environment Variable (Recommended)

Set the `VITE_PUBLIC_DOMAIN` environment variable before building:

