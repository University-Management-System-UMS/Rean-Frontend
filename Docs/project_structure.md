## Directory Structure

```plaintext
ums-app-workspace/
├── apps/                       # Application directory
│   ├── rean/                   # Rean mobile application
│   │   ├── android/            # Android native configuration
│   │   ├── ios/                # iOS native configuration
│   │   ├── app/                # Application routing (Expo Router)
│   │   │   ├── (app)/          # Authenticated routes
│   │   │   │   ├── (tabs)/     # Tab navigation
│   │   │   │   │   ├── home.tsx
│   │   │   │   │   └── _layout.tsx
│   │   │   │   └── _layout.tsx
│   │   │   ├── (public)/       # Public routes
│   │   │   │   ├── (auth)/     # Authentication routes
│   │   │   │   │   └── _layout.tsx
│   │   │   │   └── onboarding.tsx
│   │   │   └── _layout.tsx     # Root layout
│   │   ├── api/                # API interfaces and implementations
│   │   ├── assets/             # Static assets (images, fonts, etc.)
│   │   ├── components/         # Reusable UI components
│   │   ├── configs/            # App configurations
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom React hooks
│   │   ├── locale/             # Internationalization
│   │   ├── services/           # Business logic services
│   │   ├── styles/             # Global styles and themes
│   │   ├── fastlane/           # Deployment automation
│   │   │   ├── Appfile         # App identifiers
│   │   │   └── Fastfile        # Deployment workflows
│   │   ├── App.tsx             # Root component
│   │   └── package.json        # App-specific dependencies
│   │
│   └── university/             # University mobile application
│       └── [Similar structure to rean]
│
├── packages/                   # Shared packages
│   ├── ui/                     # Shared UI component library
│   │   ├── src/
│   │   │   ├── index.ts        # Main export file
│   │   │   └── components/     # Shared UI components
│   ├── eslint-config/          # Shared ESLint configurations
│   └── colors/                 # Shared color definitions
│
├── .circleci/                  # CI/CD Configuration
│   └── config.yml              # CircleCI workflows
├── .husky/                     # Git hooks
│   ├── pre-commit              # Pre-commit checks
│   └── commit-msg              # Commit message validation
├── docs/                       # Project documentation
└── package.json                # Root workspace dependencies
```

## Naming Conventions

### File and Folder Names

All folders and files should follow kebab-case convention:
- `auth-header.tsx`
- `user-card.tsx`
- `(my-class)/`
- ...

### File Extensions

- **`.tsx`** - For UI-related files:
  - Components: `auth-header.tsx`, `user-card.tsx`
  - Screens: `home.tsx`, `_layout.tsx`, `events.tsx`

- **`.ts`** - For non-UI related files:
  - `auth.context.ts`
  - `user.provider.ts`
  - `user.model.ts`
  - `user.service.ts`
  - `user.util.ts`
  - `user.helper.ts`
  - ...

### File Naming Patterns

Files should be named with their purpose as a suffix:
- `auth.context.ts`
- `user.provider.ts`
- `user.model.ts`
- `user.service.ts`
- `user.util.ts`
- `user.helper.ts`
- ...