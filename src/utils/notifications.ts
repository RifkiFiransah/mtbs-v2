import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Behavior saat notifikasi muncul ketika aplikasi sedang berjalan (foreground)
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} catch (error) {
  console.warn("Notification handler not available in Expo Go SDK 53+");
}

export const registerForPushNotificationsAsync = async () => {
  let token;

  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        sound: "default",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    } else {
      console.log("Must use physical device for Push Notifications");
    }
  } catch (error) {
    console.warn(
      "Notification registration error (may not be supported in Expo Go):",
      error,
    );
  }

  return token;
};

export const scheduleReminderNotification = async (
  id: number,
  title: string,
  body: string,
  date: Date,
) => {
  try {
    const triggerInMs = date.getTime() - new Date().getTime();

    // Jangan jadwalkan jika waktu sudah lewat
    if (triggerInMs <= 0) {
      console.log(
        "Reminder time is in the past, skipping notification schedule",
      );
      return null;
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        data: { reminderId: id },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: date,
      },
    });
    console.log("Notification scheduled with ID:", notificationId);
    return notificationId;
  } catch (error) {
    console.warn(
      "Warning: Notification scheduling not fully supported in Expo Go SDK 53+. Please use a development build for full notification support.",
      error,
    );
    // Return null instead of throwing - allows app to continue working without notifications
    return null;
  }
};

export const cancelReminderNotification = async (notificationId: string) => {
  try {
    if (!notificationId) {
      console.log("No notification ID to cancel");
      return;
    }
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    console.log("Notification cancelled with ID:", notificationId);
  } catch (error) {
    console.warn(
      "Warning: Could not cancel notification (may not be supported in Expo Go):",
      error,
    );
    // Don't throw error - just log warning
  }
};
