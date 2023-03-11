# app
The app project hosts our React Native mobile app

# setup
To set up the app to work with Expo, we have to run a few commands:
- `yarn` to install dependencies
- `npx expo prebuild` to setup `ios` and `android` directories
- `cd ios && pod install` to install ios dependencies

# development

To start the mobile app in development, we use the following commands in order:
- `npx expo start --dev-client`

Press `i` to boot on iOS or `a` for Android on your keyboard when prompted.
