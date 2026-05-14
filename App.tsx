import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { initDB } from "./src/database/db";
import AppNavigator from "./src/navigation/AppNavigator";

LogBox.ignoreLogs([
  "Android Push notifications (remote notifications) functionality provided by expo-notifications was removed from Expo Go",
  "`expo-notifications` functionality is not fully supported in Expo Go",
]);

export default function App() {
  useEffect(() => {
    // Initialize database on app launch
    initDB().catch((error) => console.error("Failed to initialize DB:", error));
  }, []);

  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor="transparent"
        translucent={true}
      />
      <AppNavigator />
    </>
  );
}
