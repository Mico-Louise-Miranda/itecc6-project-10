import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const plants = [
  { 
    name: "Peace Lily", 
    image: require("../assets/peace-lily-plant-white-pot.jpg"),
    description: "The Peace Lily is an elegant indoor plant with glossy, dark green leaves and beautiful white flowers.",
    sunlight: "Medium to Low Light",
    water: "Weekly, when soil is dry",
    soil: "Well-draining potting mix"
  },
  { 
    name: "Fiddle Leaf Fig", 
    image: require("../assets/fiddle-leaf-fig.jpg"),
    description: "The Fiddle Leaf Fig is famous for its large, violin-shaped leaves and makes a dramatic statement in any space.",
    sunlight: "Bright, indirect light",
    water: "Every 7-10 days",
    soil: "Well-draining potting soil"
  },
  { 
    name: "Faux Watermelon Peperomia", 
    image: require("../assets/faux-watermelon-peperomia.jpg"),
    description: "The Watermelon Peperomia has striking watermelon-patterned leaves that add a unique touch to your plant collection.",
    sunlight: "Medium, indirect light",
    water: "When top soil is dry",
    soil: "Peat-based potting mix"
  },
  { 
    name: "African Mask", 
    image: require("../assets/african-mask.jpg"),
    description: "The African Mask plant (Alocasia) features dramatic arrow-shaped leaves with prominent white veins.",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soil: "Rich, well-draining mix"
  },
  { 
    name: "Alocasia", 
    image: require("../assets/alocasia.jpg"),
    description: "Alocasia plants have large, exotic foliage with distinctive veining and unique leaf shapes.",
    sunlight: "Bright, indirect light",
    water: "Regular watering",
    soil: "Rich, moist soil"
  },
  { 
    name: "ZZ Plant", 
    image: require("../assets/zz-plant-.jpg"),
    description: "The ZZ Plant is virtually indestructible with its glossy, dark green leaves and ability to thrive on neglect.",
    sunlight: "Low to bright indirect",
    water: "Every 2-3 weeks",
    soil: "Standard potting mix"
  },
  { 
    name: "Alocasia Polly", 
    image: require("../assets/alocasia-polly.jpg"),
    description: "Alocasia Polly is a compact variety with striking arrow-shaped, dark green leaves with white veining.",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soil: "Well-draining mix"
  },
  { 
    name: "Palm Tree", 
    image: require("../assets/palm tree.png"),
    description: "Palm Trees bring a tropical feel to any space with their elegant fronds and structural presence.",
    sunlight: "Bright, indirect light",
    water: "Once a week",
    soil: "Sandy, well-draining"
  },
  { 
    name: "Serene Sansevieria", 
    image: require("../assets/serene sanseviera.jpg"),
    description: "Also known as Snake Plant, Sansevieria is known for its upright, sword-like leaves and air-purifying qualities.",
    sunlight: "Low to bright light",
    water: "Every 2-4 weeks",
    soil: "Well-draining, sandy mix"
  },
];

export default function PlantPreview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const plantNameParam = params.plantName;

  const selectedPlant = plants.find(p => p.name === plantNameParam) || plants[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#2E2E2E" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <View style={styles.imageBox}>
          <Image source={selectedPlant.image} style={styles.plantImage} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.plantName}>{selectedPlant.name}</Text>
          <TouchableOpacity onPress={() => router.push({ pathname: "/edit-plant", params: { plantName: selectedPlant.name } })}>
            <MaterialCommunityIcons name="pencil" size={24} color="#2E2E2E" />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>
          {selectedPlant.description}
        </Text>

        <View style={styles.careInfo}>
          <View style={styles.careItem}>
            <MaterialCommunityIcons
              name="white-balance-sunny"
              size={24}
              color="#2E2E2E"
            />
            <Text style={styles.careLabel}>{selectedPlant.sunlight}</Text>
          </View>
          <View style={styles.careItem}>
            <MaterialCommunityIcons name="water" size={24} color="#2E2E2E" />
            <Text style={styles.careLabel}>{selectedPlant.water}</Text>
          </View>
          <View style={styles.careItem}>
            <MaterialCommunityIcons name="pot-mix" size={24} color="#2E2E2E" />
            <Text style={styles.careLabel}>{selectedPlant.soil}</Text>
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
    overflow: "hidden",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    justifyContent: "space-around",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  careItem: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  careLabel: {
    marginTop: 8,
    fontSize: 14,
    color: "#2E2E2E",
    textAlign: "center",
  },
});
