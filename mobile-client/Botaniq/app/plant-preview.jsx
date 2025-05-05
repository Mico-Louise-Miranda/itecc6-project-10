import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PlantPreview() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#2E2E2E" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <MaterialCommunityIcons
            name="close"
            size={32}
            color="#2E2E2E"
            style={styles.crossIcon}
          />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.plantName}>Rose</Text>
          <TouchableOpacity onPress={() => router.push("/edit-plant")}>
            <MaterialCommunityIcons name="pencil" size={24} color="#2E2E2E" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <View style={styles.careInfo}>
          <View style={styles.careItem}>
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={24}
              color="#2E2E2E"
            />
            <Text style={styles.careLabel}>Full Sun</Text>
          </View>
          <View style={styles.careItem}>
            <MaterialCommunityIcons name="water" size={24} color="#2E2E2E" />
            <Text style={styles.careLabel}>Every 2-3 days</Text>
          </View>
          <View style={styles.careItem}>
            <MaterialCommunityIcons name="pot-mix" size={24} color="#2E2E2E" />
            <Text style={styles.careLabel}>Loamy</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F2",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    height: "50%",
    backgroundColor: "#A8BCA1",
    alignItems: "center",
    justifyContent: "center",
  },
  imageBox: {
    width: "80%",
    aspectRatio: 1,
    backgroundColor: "#F8F8F2",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    transform: [{ rotate: "45deg" }],
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  plantName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E2E2E",
  },
  description: {
    fontSize: 16,
    color: "#2E2E2E",
    lineHeight: 24,
    marginBottom: 24,
  },
  careInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  careItem: {
    alignItems: "center",
  },
  careLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#2E2E2E",
    textAlign: "center",
  },
});
