# Encontree

Encontree is an open source project originally built as the final undergraduate project (TCC) of the Information Systems program at Faculdades Integradas de Cacoal - UNESC.

The repository has three apps:

- `api`: Node.js + Express + TypeORM (PostgreSQL and MongoDB)
- `web`: React web app for service providers
- `mobile`: React Native app for clients

## Running the project

Docker and docker-compose must be installed.

Copy `.env.example` to `.env` and fill in the secrets (for example with `openssl rand -hex 32`):

```sh
cp .env.example .env
```

Then start the API, the web app and the databases:

```sh
docker-compose up -d --build
```

This installs all dependencies, builds the apps and starts their containers.

When it finishes, open `http://localhost` in your browser.

### Mobile

To run the mobile app on Android you need the Java JDK and the Android SDK installed, plus a configured emulator or device.

Install the dependencies from the `mobile` folder:

```sh
npm install
```

Android debug builds are signed with `android/app/debug.keystore`, which is not committed. Generate one with:

```sh
keytool -genkeypair -v -keystore android/app/debug.keystore -storepass android \
  -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Android Debug,O=Android,C=US"
```

On iOS, go to the `ios` folder and install the native dependencies (CocoaPods must be installed):

```sh
pod install
```

Finally, start the app on iOS or Android:

```sh
# ios
npm run ios

# android
npm run android
```

## License

[MIT](LICENSE)
