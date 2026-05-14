import React from "react";
import { Image, StyleSheet, View, ViewProps } from "react-native";

interface BackgroundWrapperProps extends ViewProps {
  children: React.ReactNode;
}

export const BackgroundWrapper = ({
  children,
  style,
  ...props
}: BackgroundWrapperProps) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <Image
        source={require("../../assets/images/bg/bg-1.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // fallback color
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.15, // sesuaikan opacity jika gambar terlalu gelap/terang
  },
});
