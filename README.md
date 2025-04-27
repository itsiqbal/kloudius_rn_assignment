# Kloudius React Native Map Assignment

## 📽️ Demo

[![Demo Video](https://img.youtube.com/vi/2qlLHXtH_bA/maxresdefault.jpg)](https://www.youtube.com/watch?v=2qlLHXtH_bA)

> Click the image above or [watch the demo on YouTube](https://www.youtube.com/watch?v=2qlLHXtH_bA).

---

## 🚀 How to Setup and Run

#### Prerequisites 
**A valid Google Maps API Key with the following services enabled:**
- **Google Maps SDK for Android**
- **Google Maps SDK for iOS**
- **Google Places API**

### 1. Clone the repository

``` bash
git clone https://github.com/itsiqbal/kloudius_rn_assignment.git

```

### 2. Create `.env` File

- Create a `.env` file at the root of your project.
- Refer to the `.env.example` file for the correct format.
- Add your **Google Maps API key** to the `.env` file to ensure the project runs properly.

### 3. Install dependencies

```bash
cd kloudius_rn_assignment/

yarn install

cd ios && pod install #pod installation for iOS only

```

### 4.  Run on iOS
- Open the `RNAssignment.xcworkspace` file in **Xcode**.
- Run the project.
- You may encounter a known `react-native-maps` issue:  
    _"Use of '@import' when C++ modules are disabled, consider using -fmodules and -fcxx-modules."_
    - To fix this, open the file `GMUWeightedLatLng`.
    - Replace `@import GoogleMaps;` with `#import <GoogleMaps/GoogleMaps.h>`.
- Run the project again.
- The iOS project should now be running successfully.

### 5. Run on Android

- Open the project in **Android Studio**.
- Make sure you have an Android emulator running or a device connected.
- Sync the Gradle files if prompted.
- Run the project.
- If you encounter any `Google Maps` related errors:
    - Ensure your **Google Maps API key** is properly set up in `android/app/src/main/AndroidManifest.xml`.
    - Confirm that the correct permissions are added (e.g., `ACCESS_FINE_LOCATION`, `INTERNET`).
- After fixing any issues, re-run the project.
- The Android project should now be running successfully.
