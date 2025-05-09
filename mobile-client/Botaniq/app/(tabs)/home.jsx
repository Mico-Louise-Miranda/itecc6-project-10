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
import { useState } from "react";

// Copied plants data from garden.jsx
const plants = [
  { 
    name: "Peace Lily", 
    image: require("../../assets/peace-lily-plant-white-pot.jpg"),
    description: "The Peace Lily is an elegant indoor plant with glossy, dark green leaves and beautiful white flowers.",
    scientificName: "Spathiphyllum",
    sunlight: "Medium to Low Light",
    water: "Weekly, when soil is dry",
    soilType: "Well-draining potting mix"
  },
  { 
    name: "Fiddle Leaf Fig", 
    image: require("../../assets/fiddle-leaf-fig.jpg"),
    description: "The Fiddle Leaf Fig is famous for its large, violin-shaped leaves and makes a dramatic statement in any space.",
    scientificName: "Ficus lyrata",
    sunlight: "Bright, indirect light",
    water: "Every 7-10 days",
    soilType: "Well-draining potting soil"
  },
  { 
    name: "Faux Watermelon Peperomia", 
    image: require("../../assets/faux-watermelon-peperomia.jpg"),
    description: "The Watermelon Peperomia has striking watermelon-patterned leaves that add a unique touch to your plant collection.",
    scientificName: "Peperomia argyreia",
    sunlight: "Medium, indirect light",
    water: "When top soil is dry",
    soilType: "Peat-based potting mix"
  },
  { 
    name: "African Mask", 
    image: require("../../assets/african-mask.jpg"),
    description: "The African Mask plant (Alocasia) features dramatic arrow-shaped leaves with prominent white veins.",
    scientificName: "Alocasia amazonica",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soilType: "Rich, well-draining mix"
  },
  { 
    name: "Alocasia", 
    image: require("../../assets/alocasia.jpg"),
    description: "Alocasia plants have large, exotic foliage with distinctive veining and unique leaf shapes.",
    scientificName: "Alocasia spp.",
    sunlight: "Bright, indirect light",
    water: "Regular watering",
    soilType: "Rich, moist soil"
  },
  { 
    name: "ZZ Plant", 
    image: require("../../assets/zz-plant-.jpg"),
    description: "The ZZ Plant is virtually indestructible with its glossy, dark green leaves and ability to thrive on neglect.",
    scientificName: "Zamioculcas zamiifolia",
    sunlight: "Low to bright indirect",
    water: "Every 2-3 weeks",
    soilType: "Standard potting mix"
  },
  { 
    name: "Alocasia Polly", 
    image: require("../../assets/alocasia-polly.jpg"),
    description: "Alocasia Polly is a compact variety with striking arrow-shaped, dark green leaves with white veining.",
    scientificName: "Alocasia 'Polly'",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soilType: "Well-draining mix"
  },
  { 
    name: "Palm Tree", 
    image: require("../../assets/palm tree.png"),
    description: "Palm Trees bring a tropical feel to any space with their elegant fronds and structural presence.",
    scientificName: "Arecaceae family",
    sunlight: "Bright, indirect light",
    water: "Once a week",
    soilType: "Sandy, well-draining"
  },
  { 
    name: "Serene Sansevieria", 
    image: require("../../assets/serene sanseviera.jpg"),
    description: "Also known as Snake Plant, Sansevieria is known for its upright, sword-like leaves and air-purifying qualities.",
    scientificName: "Sansevieria trifasciata",
    sunlight: "Low to bright light",
    water: "Every 2-4 weeks",
    soilType: "Well-draining, sandy mix"
  },
];

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? plants.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === plants.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentPlant = plants[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Botaniq</Text>

        <View style={styles.plantPreview}>
          <TouchableOpacity style={styles.arrowButton} onPress={handlePrevious}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#2E2E2E"
            />
          </TouchableOpacity>

          <View style={styles.plantCard}>
            <View style={styles.imageBox}>
              <Image source={currentPlant.image} style={styles.plantImage} />
            </View>
            <Text style={styles.plantName}>{currentPlant.name}</Text>
            <Text style={styles.plantDescription}>
              {currentPlant.description}
            </Text>
          </View>

          <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color="#2E2E2E"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push({ pathname: "/plant-preview", params: { plantName: currentPlant.name } })}
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
    overflow: "hidden",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
