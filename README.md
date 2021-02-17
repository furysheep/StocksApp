# Stocks Mobile App

## Running the project

First create an env file that contains IEX cloud api host and publishable token

```
cp .env.example .env
```

Use `https://cloud.iexapis.com` for production or `https://sandbox.iexapis.com` for sandbox environment

Assuming you have all the requirements installed, you can setup and run the project by running:

- `yarn install` to install the dependencies
- `react-native run-android` to run the Android application (remember to start a simulator or connect an Android phone)
- `react-native run-ios` to run the iOS application (remember to start a simulator or connect an iPhone phone)
