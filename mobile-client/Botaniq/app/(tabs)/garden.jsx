import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

const PlantCard = ({ name, onPress, image }) => (
  <TouchableOpacity style={styles.plantCard} onPress={onPress}>
    <View style={styles.imageBox}>
      <Image source={image} style={styles.plantImage} />
    </View>
    <Text style={styles.plantName}>{name}</Text>
  </TouchableOpacity>
);

export default function Garden() {
  const router = useRouter();
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
              name={plant.name}
              image={plant.image}
              onPress={() => router.push({ pathname: "/plant-preview", params: { plantName: plant.name } })}
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
    overflow: "hidden",
  },
  plantImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  plantName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2E2E2E",
    textAlign: "center",
  },
});
