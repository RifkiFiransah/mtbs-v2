import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

export const CustomHeader = ({
  title,
  showBack = false,
  onBackPress,
  rightAction,
}: CustomHeaderProps) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 25,
      paddingHorizontal: 30,
      paddingVertical: 20,
      backgroundColor: "#F5F5F5",
      borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    },
    backButton: {
      paddingRight: 10,
    },
    titleContainer: {
      flex: 1,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: "#1E3A8A",
    },
    rightActionButton: {
      paddingLeft: 20,
    },
  });

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <MaterialIcons name="arrow-back" size={28} color="#1E88E5" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {rightAction ? (
        <TouchableOpacity
          style={styles.rightActionButton}
          onPress={rightAction.onPress}
        >
          <MaterialIcons
            name={rightAction.icon as any}
            size={28}
            color="#1E88E5"
          />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
};
