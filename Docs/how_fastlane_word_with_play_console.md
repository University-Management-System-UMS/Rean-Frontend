# Fastlane and Play Console Integration Flow

## Authentication Flow

- Fastlane → Google Cloud Authentication:

  - When you run `fastlane android beta`
  - Fastlane reads your service account JSON key
  - Uses it to authenticate with Google Cloud APIs
  - Specifically uses Google Play Developer API

- Google Cloud → Play Console Connection:

  - The service account acts as an identity
  - Google Cloud verifies the service account has permission to access Play Console via Google Play Developer API
  - The JSON key proves that Fastlane is authorized to act on behalf of this service account

- Play Console → App Management:
  - Play Console checks if the service account has permissions for the specific package name (app)
  - If authorized, allows Fastlane to perform actions (upload APK, update metadata, etc.)

## Process Flow

Fastlane (with JSON key) → Google Cloud Auth → Google Play Developer API → Play Console Permission Check → Perform App Actions

## Google Cloud's Role

In this specific flow with Fastlane and Play Console, Google Cloud's main role is authentication and API access management through the Google Play Developer API. It acts as a security layer where:

1. The service account and its JSON key are just credentials
2. The Google Play Developer API provides the secure connection pathway
3. The actual app management happens in Play Console

Think of Google Cloud like a security guard that:

- Checks your ID (JSON key)
- Verifies you're allowed in (service account permissions)
- Opens the door to Play Console via Google Play Developer API

The real work (uploading APKs, managing app releases, etc.) happens in Play Console. Google Cloud just provides the secure "hallway" through Google Play Developer API between Fastlane and Play Console.

## Setup Requirements

This is why when you set up app publishing, you need:

1. A Google Cloud project (for the service account)
2. Enable Google Play Developer API in Google Cloud Console
3. Play Console permissions (for actual app management)
4. But you don't need to configure anything else in Google Cloud

```mermaid
graph TD
    A[Fastlane Command] --> B[Read .env.fastlane]
    B --> C[Load Credentials]
    C --> D[Read Service Account JSON Key]
    D --> E[Google Cloud Authentication]
    E --> F[Google Play Developer API]
    F --> G{Check App Permissions}
    G -->|Authorized| H[Upload APK/Bundle]
    G -->|Unauthorized| I[Error: No Permission]
    H --> J[Create Release]
    J --> K[Deploy to Track]
    K --> L[Internal/Alpha/Beta/Production]


- have a project at Google Cloud Console to manage and enable services
- enable Google Developer Android API for connection between from Fastlane to Play Console
- enable Service Accounts API for authentication (you will get email for this to use in Play Console)
- use the email created by the Service Account and use Play Console to invite thsi email as apps admin for the service to be able connect to Play Console
- Make JSON out of the service account use in your project to manage auth between Fastlane and Play Console in your project
```
