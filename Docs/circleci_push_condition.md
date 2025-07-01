- feature branch(dynamic)
- epic branch(dynamic)
- develop
- main

*** detect file changes conditions ***
  *** base branch ***
  We need to compare the current branch with the target branch (base branch) to determine the type of change.
  - If the current branch is a feature branch, the target branch is the epic branch.
  - If the current branch is an epic branch, the target branch is the develop branch.
  - If the current branch is the develop branch, the target branch is the main branch.
  
  *** branch definations ***
  - For the feature branches all the branches that are not main develop and epic/* consider as feature branch
  - For the epic branches all the branches that start with epic/* consider as epic branch
  - For the develop and main the names are fixed


* when push to epic branch(dynamic)

  - run test
  - run lint

* when push to develop

  - run test
  - run lint
  - run deploy to dev

* when push to master
  - run test
  - run lint
  - run deploy to prod

- currently there are 2 expo projects in a monorepo
  - if only change in rean then do test/lint/deploy only rean
  - if only change in university then do test/lint/deploy only university
  - if the shared package is changed then do test/lint/deploy everything

1. Smart Change Detection System
   I've added a detect-platform-changes command that:

Checks commit messages for platform-specific tags like [android] or [ios]
Analyzes file changes to determine which platform is affected
Detects shared code changes that might impact both platforms
Sets environment variables to control which workflows run

2. Pipeline Parameters for Conditional Execution
   The configuration now uses CircleCI pipeline parameters to dynamically control:

Which app to build (rean, university, or both)
Which platform to build (ios, android, or both)
Which environment to target (dev, uat, prod)

3. Safety Net for Cross-Platform Dependencies
   For your specific concern about React Native code that might affect both platforms:

The change detection analyzes shared code files in the src directory
If changes are in shared code, both platforms will build by default
You can still override with commit tags when you're certain

4. Workflow Conditions
   I've structured workflows to:

Run only for the app and platform affected by changes
Include branch filtering to control which environments are targeted
Maintain your approval process for promoting to higher environments

How to Use This Enhanced Configuration

For Android-only changes:

Add [android] to your commit message
Only Android builds will run

For iOS-only changes:

Add [ios] to your commit message
Only iOS builds will run

For shared/uncertain changes:

Don't add any platform tag
The system will analyze your changes and build both platforms if any shared code is modified

For safety-critical changes:

Don't add any tag to ensure both platforms are tested

Additional Recommendations

Improve Testing Strategy:

Add more platform-specific tests to catch issues early
Consider setting up automated UI testing with screenshots

Separate Platform-Specific Code:

Use more .ios.js and .android.js files to separate platform-specific logic
Keep shared code clearly separated from platform-specific code

Add Change Analysis Reports:

Consider adding a job that generates a report of what changed and which platforms might be affected
This could help in code review to identify potential cross-platform issues
