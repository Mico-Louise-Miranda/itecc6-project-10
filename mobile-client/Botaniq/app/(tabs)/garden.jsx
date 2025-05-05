import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlantCard = ({ name, onPress }) => (
  <TouchableOpacity style={styles.plantCard} onPress={onPress}>
    <View style={styles.imageBox}>
      <MaterialCommunityIcons
        name="close"
        size={24}
        color="#2E2E2E"
        style={styles.crossIcon}
      />
    </View>
    <Text style={styles.plantName}>{name}</Text>
  </TouchableOpacity>
);

export default function Garden() {
  const router = useRouter();
  const plants = [
    "Rose",
    "Aloe Vera",
    "Lavender",
    "Jade Plant",
    "Boston Ivy",
    "Peace Lily",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Garden</Text>
        <Text style={styles.subtitle}>Your collection of thriving greens</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {plants.map((plant, index) => (
            <PlantCard
              key={index}
              name={plant}
              onPress={() => router.push("/plant-preview")}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A8BCA1",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#2E2E2E",
    opacity: 0.8,
  },
  scrollContent: {
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  plantCard: {
    width: "48%",
    marginBottom: 16,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F8F8F2",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    transform: [{ rotate: "45deg" }],
  },
  plantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2E2E2E",
    textAlign: "center",
  },
});
