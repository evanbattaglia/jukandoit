curl "http://localhost:8081/index.android.bundle?platform=android" -o android/app/src/main/assets/index.android.bundle && (cd android/ && ./gradlew assembleDebug)
cp ./android/app/build/outputs/apk/app-debug.apk ~/Dropbox/
rm android/app/src/main/assets/index.android.bundle
