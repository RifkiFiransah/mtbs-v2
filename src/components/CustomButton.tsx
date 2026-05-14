import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

export const CustomButton = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  size = "medium",
}: CustomButtonProps) => {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 12,
      paddingVertical: size === "small" ? 10 : size === "large" ? 16 : 13,
      paddingHorizontal: size === "small" ? 16 : size === "large" ? 24 : 20,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: variant === "primary" ? "#1E88E5" : "transparent",
      borderWidth: variant === "secondary" ? 2 : 0,
      borderColor: variant === "secondary" ? "#1E88E5" : "transparent",
      opacity: disabled ? 0.6 : 1,
    },
    text: {
      fontSize: size === "small" ? 12 : size === "large" ? 16 : 14,
      fontWeight: "600",
      color: variant === "primary" ? "#FFFFFF" : "#1E88E5",
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};
