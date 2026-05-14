import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuCardProps {
  icon: string;
  title: string;
  description?: string;
  onPress: () => void;
  badge?: string | number;
}

export const MenuCard = ({
  icon,
  title,
  description,
  onPress,
  badge,
}: MenuCardProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      paddingVertical: 20,
      paddingHorizontal: 16,
      marginBottom: 12,
      marginHorizontal: 4,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#E3F2FD",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: "#1E3A8A",
      marginBottom: 4,
    },
    description: {
      fontSize: 13,
      color: "#666666",
      lineHeight: 18,
    },
    badge: {
      backgroundColor: "#E74C3C",
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginLeft: 8,
    },
    badgeText: {
      color: "#FFFFFF",
      fontSize: 12,
      fontWeight: "600",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon as any} size={28} color="#1E88E5" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
