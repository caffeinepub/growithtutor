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

