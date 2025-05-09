import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

const plants = [
  { 
    name: "Peace Lily", 
    image: require("../assets/peace-lily-plant-white-pot.jpg"),
    description: "The Peace Lily is an elegant indoor plant with glossy, dark green leaves and beautiful white flowers.",
    scientificName: "Spathiphyllum",
    sunlight: "Medium to Low Light",
    water: "Weekly, when soil is dry",
    soilType: "Well-draining potting mix"
  },
  { 
    name: "Fiddle Leaf Fig", 
    image: require("../assets/fiddle-leaf-fig.jpg"),
    description: "The Fiddle Leaf Fig is famous for its large, violin-shaped leaves and makes a dramatic statement in any space.",
    scientificName: "Ficus lyrata",
    sunlight: "Bright, indirect light",
    water: "Every 7-10 days",
    soilType: "Well-draining potting soil"
  },
  { 
    name: "Faux Watermelon Peperomia", 
    image: require("../assets/faux-watermelon-peperomia.jpg"),
    description: "The Watermelon Peperomia has striking watermelon-patterned leaves that add a unique touch to your plant collection.",
    scientificName: "Peperomia argyreia",
    sunlight: "Medium, indirect light",
    water: "When top soil is dry",
    soilType: "Peat-based potting mix"
  },
  { 
    name: "African Mask", 
    image: require("../assets/african-mask.jpg"),
    description: "The African Mask plant (Alocasia) features dramatic arrow-shaped leaves with prominent white veins.",
    scientificName: "Alocasia amazonica",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soilType: "Rich, well-draining mix"
  },
  { 
    name: "Alocasia", 
    image: require("../assets/alocasia.jpg"),
    description: "Alocasia plants have large, exotic foliage with distinctive veining and unique leaf shapes.",
    scientificName: "Alocasia spp.",
    sunlight: "Bright, indirect light",
    water: "Regular watering",
    soilType: "Rich, moist soil"
  },
  { 
    name: "ZZ Plant", 
    image: require("../assets/zz-plant-.jpg"),
    description: "The ZZ Plant is virtually indestructible with its glossy, dark green leaves and ability to thrive on neglect.",
    scientificName: "Zamioculcas zamiifolia",
    sunlight: "Low to bright indirect",
    water: "Every 2-3 weeks",
    soilType: "Standard potting mix"
  },
  { 
    name: "Alocasia Polly", 
    image: require("../assets/alocasia-polly.jpg"),
    description: "Alocasia Polly is a compact variety with striking arrow-shaped, dark green leaves with white veining.",
    scientificName: "Alocasia 'Polly'",
    sunlight: "Bright, indirect light",
    water: "Keep soil moist",
    soilType: "Well-draining mix"
  },
  { 
    name: "Palm Tree", 
    image: require("../assets/palm tree.png"),
    description: "Palm Trees bring a tropical feel to any space with their elegant fronds and structural presence.",
    scientificName: "Arecaceae family",
    sunlight: "Bright, indirect light",
    water: "Once a week",
    soilType: "Sandy, well-draining"
  },
  { 
    name: "Serene Sansevieria", 
    image: require("../assets/serene sanseviera.jpg"),
    description: "Also known as Snake Plant, Sansevieria is known for its upright, sword-like leaves and air-purifying qualities.",
    scientificName: "Sansevieria trifasciata",
    sunlight: "Low to bright light",
    water: "Every 2-4 weeks",
    soilType: "Well-draining, sandy mix"
  },
];

export default function EditPlant() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const plantNameParam = params.plantName;

  const [plantData, setPlantData] = useState({
    name: "",
    scientificName: "",
    sunlight: "",
    water: "",
    soilType: "",
  });
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const selectedPlant = plants.find(p => p.name === plantNameParam);
    if (selectedPlant) {
      setPlantData({ 
        name: selectedPlant.name,
        scientificName: selectedPlant.scientificName,
        sunlight: selectedPlant.sunlight,
        water: selectedPlant.water,
        soilType: selectedPlant.soilType
      });
      setCurrentImage(selectedPlant.image); 
    } else {
      setPlantData({ 
        name: "Plant Not Found", 
        scientificName: "", 
        sunlight: "", 
        water: "", 
        soilType: "" 
      });
      setCurrentImage(null);
    }
  }, [plantNameParam]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="#F8F8F2"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Plant</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <View style={styles.imagePlaceholder}>
            {currentImage ? (
              <Image source={currentImage} style={styles.plantImage} />
            ) : (
              <Text>No Image</Text>
            )}
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialCommunityIcons name="camera" size={24} color="#F8F8F2" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Plant Name</Text>
            <TextInput
              style={styles.input}
              value={plantData.name}
              onChangeText={(text) =>
                setPlantData({ ...plantData, name: text })
              }
              placeholder="Enter plant name"
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Scientific Name</Text>
            <TextInput
              style={styles.input}
              value={plantData.scientificName}
              onChangeText={(text) =>
                setPlantData({ ...plantData, scientificName: text })
              }
              placeholder="Enter scientific name"
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Sunlight Needs</Text>
            <TextInput
              style={styles.input}
              value={plantData.sunlight}
              onChangeText={(text) =>
                setPlantData({ ...plantData, sunlight: text })
              }
              placeholder="Enter sunlight needs"
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Water Schedule</Text>
            <TextInput
              style={styles.input}
              value={plantData.water}
              onChangeText={(text) =>
                setPlantData({ ...plantData, water: text })
              }
              placeholder="Enter water schedule"
              placeholderTextColor="#666666"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Soil Type</Text>
            <TextInput
              style={styles.input}
              value={plantData.soilType}
              onChangeText={(text) =>
                setPlantData({ ...plantData, soilType: text })
              }
              placeholder="Enter soil type"
              placeholderTextColor="#666666"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F2",
  },
  header: {
    backgroundColor: "#A8BCA1",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F8F8F2",
  },
  content: {
    flex: 1,
  },
  imageSection: {
    padding: 20,
    alignItems: "center",
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 20,
    backgroundColor: "#A8BCA1",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2E2E2E",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2E2E2E",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 0,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A8BCA1",
    marginRight: 8,
  },
  clearButtonText: {
    color: "#A8BCA1",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#A8BCA1",
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#F8F8F2",
    fontSize: 16,
    fontWeight: "600",
  },
});
