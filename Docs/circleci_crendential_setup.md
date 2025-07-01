# CircleCI Credentials Setup Guide

## Organization Settings

### Shared Credentials Context

Navigate to: Organization Settings -> Contexts -> Create "shared-credentials"

#### Apple Store Credentials

- `APP_STORE_CONNECT_API_KEY_ISSUER_ID`: Base64 encoded issuer ID
- `APP_STORE_CONNECT_API_KEY_KEY`: Base64 encoded key (AuthKey_XXX.p8)
- `APP_STORE_CONNECT_API_KEY_KEY_ID`: Base64 encoded key ID
- `FASTLANE_TEAM_ID`: Apple Developer Team ID
- `FASTLANE_USER`: Apple ID

#### Google Play Store Credentials

- `GOOGLE_SERVICE_JSON_KEY_DATA`: Service account key JSON value

#### Certificate Management

- `MATCH_GIT_BASIC_AUTHORIZATION`: GitHub token (from mptc-koklim)
- `MATCH_PASSWORD`: Access password for certificate repository
  > Repository: https://github.com/mptc-koklim/fastlane-certificate.git

### App-Specific Contexts

#### Rean App

1. **Development Context** (rean-development)

   - `REAN_APP_IDENTIFIER`: kh.gov.rean.dev
   - `REAN_KEYSTORE_DATA`: Base64 encoded keystore
   - `REAN_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `REAN_KEYSTORE_PASSWORD`: Keystore password
   - `REAN_STORE_PASSWORD`: Keystore store password

2. **UAT Context** (rean-uat)

   - `REAN_APP_IDENTIFIER`: kh.gov.rean.uat
   - `REAN_KEYSTORE_DATA`: Base64 encoded keystore
   - `REAN_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `REAN_KEYSTORE_PASSWORD`: Keystore password
   - `REAN_STORE_PASSWORD`: Keystore store password

3. **Production Context** (rean-production)
   - `REAN_APP_IDENTIFIER`: kh.gov.rean
   - `REAN_KEYSTORE_DATA`: Base64 encoded keystore
   - `REAN_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `REAN_KEYSTORE_PASSWORD`: Keystore password
   - `REAN_STORE_PASSWORD`: Keystore store password

#### University App

1. **Development Context** (university-development)

   - `UNIVERSITY_APP_IDENTIFIER`: kh.gov.university.dev
   - `UNIVERSITY_KEYSTORE_DATA`: Base64 encoded keystore
   - `UNIVERSITY_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `UNIVERSITY_KEYSTORE_PASSWORD`: Keystore password
   - `UNIVERSITY_STORE_PASSWORD`: Keystore store password

2. **UAT Context** (university-uat)

   - `UNIVERSITY_APP_IDENTIFIER`: kh.gov.university.uat
   - `UNIVERSITY_KEYSTORE_DATA`: Base64 encoded keystore
   - `UNIVERSITY_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `UNIVERSITY_KEYSTORE_PASSWORD`: Keystore password
   - `UNIVERSITY_STORE_PASSWORD`: Keystore store password

3. **Production Context** (university-production)
   - `UNIVERSITY_APP_IDENTIFIER`: kh.gov.university
   - `UNIVERSITY_KEYSTORE_DATA`: Base64 encoded keystore
   - `UNIVERSITY_KEYSTORE_KEY_ALIAS`: Keystore alias
   - `UNIVERSITY_KEYSTORE_PASSWORD`: Keystore password
   - `UNIVERSITY_STORE_PASSWORD`: Keystore store password

## Project Settings

### Environment Variables

Navigate to: Project Settings -> Environment Variables -> Add Variable

- `CIRCLE_TOKEN`: CircleCI API token
