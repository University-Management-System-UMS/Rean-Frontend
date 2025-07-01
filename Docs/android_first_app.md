check keystore detail: keytool -list -v -keystore path/to/keystore
To verify the signing, you can check the APK signature using: keytool -printcert -jarfile path/to/apk

bundle infomation: bundletool dump manifest --bundle=/path/to/your/app.aab

check list before public your first app:

- build the app with release mode
  - make sure the keystore is secure and have backup
  - make use to build the release app with correct sign
    - alias name
    - keystore password
    - key password
      verifty the keystore you used to sign the app by: keytool -list -v -keystore path/to/keystore
      verify the APK/AAB signature using: keytool -printcert -jarfile path/to/apk/aab
      verify the bundle infomation: bundletool dump manifest --bundle=/path/to/your/app.aab
  - (careful) when upload the release to Play Console, the app wills store by just upload them (without even need to click 'Next' to confirm)
  - Double check by upload another build using the same keystore to check if Play Console accept or reject the new app.
  - Double Check app package name when upload to Play Console since we use flavor to build the app.
  - Make the app is bundleRelease (aab) or assetRelease (apk)
