import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ResultCardProps {
  title: string;
  description: string;
  isDanger: boolean;
  iconName: "warning" | "check-circle";
}

export const ResultCard = ({
  title,
  description,
  isDanger,
  iconName,
}: ResultCardProps) => {
  const borderColor = isDanger ? "#DC2626" : "#10B981";
  const backgroundColor = isDanger ? "#DC2626" : "#10B981";

  return (
    <View style={[styles.resultCard, { borderColor }]}>
      <View style={[styles.resultHeader, { backgroundColor }]}>
        <Text style={styles.resultTitle}>{title}</Text>
        <MaterialIcons
          name={iconName}
          size={60}
          color="#fff"
          style={{ marginTop: 10 }}
        />
      </View>
      <View style={styles.resultBody}>
        <Text style={styles.resultDesc}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resultCard: {
    borderWidth: 2,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 20,
  },
  resultHeader: {
    padding: 30,
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
  },
  resultBody: {
    padding: 24,
    backgroundColor: "#fff",
  },
  resultDesc: {
    fontSize: 16,
    textAlign: "center",
    color: "#111827",
    lineHeight: 24,
  },
});
