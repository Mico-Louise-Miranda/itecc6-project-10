import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Botaniq</Text>

        <View style={styles.plantPreview}>
          <TouchableOpacity style={styles.arrowButton}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#2E2E2E"
            />
          </TouchableOpacity>

          <View style={styles.plantCard}>
            <View style={styles.imageBox}>
              <MaterialCommunityIcons
                name="close"
                size={24}
                color="#2E2E2E"
                style={styles.crossIcon}
              />
            </View>
            <Text style={styles.plantName}>Rose</Text>
            <Text style={styles.plantDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>

          <TouchableOpacity style={styles.arrowButton}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#2E2E2E"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push("/plant-preview")}
        >
          <Text style={styles.viewButtonText}>View Plant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8BCA1",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 40,
  },
  plantPreview: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxHeight: 500,
  },
  arrowButton: {
    padding: 10,
  },
  plantCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F8F8F2",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }, { rotate: "45deg" }],
  },
  plantName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 12,
  },
  plantDescription: {
    fontSize: 14,
    color: "#2E2E2E",
    textAlign: "center",
    lineHeight: 20,
  },
  viewButton: {
    backgroundColor: "#2E2E2E",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginBottom: 40,
  },
  viewButtonText: {
    color: "#F8F8F2",
    fontSize: 16,
    fontWeight: "500",
  },
});
