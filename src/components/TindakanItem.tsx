import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TindakanItemProps {
  iconName: keyof typeof Ionicons.glyphMap;
  text: string;
  iconColor?: string;
}

export const TindakanItem = ({
  iconName,
  text,
  iconColor,
}: TindakanItemProps) => {
  return (
    <View style={styles.tindakanItem}>
      <Ionicons name={iconName} size={24} color={iconColor || "#DC2626"} />
      <Text style={styles.tindakanText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tindakanItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tindakanText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#111827",
    flex: 1,
    fontWeight: "500",
  },
});
