# Project Setup Guide

## Prerequisites

Ensure you have the following installed before proceeding:

- **pnpm** >= 8.6.1
- **Node.js** >= 18.16.0

## Installation

To install all required dependencies, run:

```bash
pnpm i
```

## Running the Projects

- Start both projects:
  ```bash
  pnpm start
  ```
- Start **Rean**:
  ```bash
  pnpm start:rean
  ```
- Start **University**:
  ```bash
  pnpm start:university
  ```

## Building the Projects

After development, build the respective project:

```bash
cd apps/rean && pnpx expo prebuild
```

or

```bash
cd apps/university && pnpx expo prebuild
```

## Environment Variables

Each app (**Rean**, **University**) has its own `.env` files for different environments:

- **Development:** `.env.development`
- **Testing (UAT):** `.env.test`
- **Production:** `.env.production`

### File Locations

Place these files in their respective project directories:

```
apps/rean/.env.development
apps/rean/.env.test
apps/rean/.env.production
apps/university/.env.development
apps/university/.env.test
apps/university/.env.production
```

All projects share the same environment variable structure:

```env
EXPO_PUBLIC_API_URL=<your_api_url>
```

## Important Warnings 🚨

### **Do NOT run the following command:**

```bash
pnpx expo prebuild --clean
```

This will **erase** the `ios` and `android` folders, resetting project configurations and build variants.

### **Do NOT manually delete `ios` or `android` folders.**

Deleting these folders will remove all custom configurations, including:

- Build variants
- Custom setup for iOS & Android
- Any manual modifications

### **Before making changes to builds, ensure you understand:**

- **Android:** [Setting up product flavors](#)
- **iOS:** [Configuring multiple schemes](#)

## Troubleshooting

If you encounter issues running the project:

1. Make sure package versions are consistent across all projects (**Rean**, **University**, and shared dependencies).
2. Go directly to the project folder, install dependencies, and start from there:
   ```bash
   cd apps/rean && pnpm i && pnpm start
   ```
   or
   ```bash
   cd apps/university && pnpm i && pnpm start
   ```
3. Clear cache
4. Remove `node_modules`
5. Reinstall dependencies:
   ```bash
   pnpm i
   ```
6. Run the project again:
   ```bash
   pnpm start
   ```
7. Ensure dependencies are installed correctly and there are no conflicts.
8. If caching issues persist, try cloning the project again, restarting your computer, moving the project to a different location, and running:
   ```bash
   pnpm i
   cd apps/rean or cd apps/university
   pnpm i
   pnpm start
   ```

### **iOS Build Issues**

If an iOS build fails:

```bash
pod deintegrate
pod install
```

## Pre-Commit Checks ✅

Before committing any changes, there will be hooks to prevent from committing bad code by

- run lint of file changes
- run unit test
- valid commit message.

If any of the follow check above fail when commit, you need to fix all of those before you can successful commit your changes.

## Bumping Project Versions 🚀

If you need to bump the version, use the following commands:

### **Rean**

#### **Android**

```bash
pnpm bump:rean:android:patch   # Patch version (resets build number to 0)
pnpm bump:rean:android:minor   # Minor version (resets build number to 0)
pnpm bump:rean:android:major   # Major version (resets build number to 0)
```

#### **iOS**

```bash
pnpm bump:rean:ios:patch   # Patch version (resets build number to 0)
pnpm bump:rean:ios:minor   # Minor version (resets build number to 0)
pnpm bump:rean:ios:major   # Major version (resets build number to 0)
```

### **University**

#### **Android**

```bash
pnpm bump:university:android:patch   # Patch version (resets build number to 0)
pnpm bump:university:android:minor   # Minor version (resets build number to 0)
pnpm bump:university:android:major   # Major version (resets build number to 0)
```

#### **iOS**

```bash
pnpm bump:university:ios:patch   # Patch version (resets build number to 0)
pnpm bump:university:ios:minor   # Minor version (resets build number to 0)
pnpm bump:university:ios:major   # Major version (resets build number to 0)
```

---

**Note:** Every patch, minor, or major version bump will reset the build number or version code to **0**. Ensure this is accounted for in your deployment process.

Following these steps should help maintain a stable development workflow. If you need further assistance, refer to the respective build setup documentation. 🚀
# Rean-Frontend
# Rean-Frontend
