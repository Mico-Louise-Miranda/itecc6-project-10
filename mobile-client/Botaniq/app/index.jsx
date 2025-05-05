import { StyleSheet, View, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoaderScreen() {
  const router = useRouter();
  const loadingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Loading animation
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Navigate to tabs after animation
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="flower-tulip" size={64} color="#2E2E2E" />
      <View style={styles.loadingBarContainer}>
        <Animated.View
          style={[
            styles.loadingBar,
            {
              width: loadingAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F2",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  loadingBarContainer: {
    width: "30%",
    height: 2,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "#2E2E2E",
  },
});
