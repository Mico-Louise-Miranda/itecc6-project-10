import { StyleSheet, View, Text, SafeAreaView, ScrollView, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

// Plant data (ideally this would come from a shared source or state management)
const basePlants = [
  { 
    name: "Peace Lily", 
    image: require("../../assets/peace-lily-plant-white-pot.jpg"),
  },
  { 
    name: "Fiddle Leaf Fig", 
    image: require("../../assets/fiddle-leaf-fig.jpg"),
  },
  { 
    name: "Faux Watermelon Peperomia", 
    image: require("../../assets/faux-watermelon-peperomia.jpg"),
  },
  { 
    name: "African Mask", 
    image: require("../../assets/african-mask.jpg"),
  },
  { 
    name: "Alocasia", 
    image: require("../../assets/alocasia.jpg"),
  },
  { 
    name: "ZZ Plant", 
    image: require("../../assets/zz-plant-.jpg"),
  },
  // Add more plants if necessary, or use a subset for the routine screen
];

// Mock routine data for each plant
const routinePlantsData = basePlants.map((plant, index) => ({
  ...plant,
  wateringFrequency: `[ Every ${[3,7,10,4,14,5][index % 6]} days ]`, // Example frequencies
  lastWatered: `April ${[20,18,13,15,21,19][index % 6]}`,
  nextWatering: `April ${[23,25,23,29,25,24][index % 6]}`,
}));


export default function Routine() {
  const [isAllRemindersEnabled, setIsAllRemindersEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainHeader}>
        <Text style={styles.appName}>Botaniq</Text>
        <Text style={styles.title}>Routine</Text>
        <Text style={styles.subtitle}>Set your plant care schedule and get timely reminders.</Text>
      </View>

      <View style={styles.controlsContainer}>
        <View style={styles.controlItem}>
          <Text style={[styles.controlLabel, { marginRight: 6 }]}>Enable All Reminders</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#A8BCA1" }}
            thumbColor={isAllRemindersEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={setIsAllRemindersEnabled}
            value={isAllRemindersEnabled}
          />
        </View>
        <View style={styles.controlItem}>
          <MaterialCommunityIcons name="calendar-clock" size={20} color="#2E2E2E" />
          <Text style={[styles.controlLabel, styles.reminderTimeText]}>Reminder Time: [ 6:00 AM ]</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {routinePlantsData.map((plant, index) => (
          <View key={index} style={styles.plantCard}>
            <View style={styles.cardImagePlaceholder}>
              <MaterialCommunityIcons name="image-off-outline" size={40} color="#58705F" />
            </View>
            <Text style={styles.cardPlantName}>{plant.name}</Text>
            <Text style={styles.cardDetailText}>Watering Frequency:</Text>
            <Text style={styles.cardDetailValue}>{plant.wateringFrequency}</Text>
            <Text style={styles.cardDetailText}>Last Watered: {plant.lastWatered}</Text>
            <Text style={styles.cardDetailText}>Next Watering: {plant.nextWatering}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8", // Light background for the page
  },
  mainHeader: {
    paddingHorizontal: 20,
    paddingTop: 20, // Adjusted for SafeAreaView
    paddingBottom: 10,
    backgroundColor: '#F0F4F8', 
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#2E2E2E",
    marginBottom: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E2E2E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555555",
    marginBottom:10,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    backgroundColor: '#F0F4F8',
  },
  controlItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlLabel: {
    fontSize: 14,
    color: "#2E2E2E",
  },
  reminderTimeText: {
    marginLeft: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10, // Main padding for the grid area
  },
  plantCard: {
    width: "48%", // For two columns with a bit of space
    backgroundColor: "#D9E7D5", // Light green card background from image
    borderRadius: 8,
    padding: 12,
    marginBottom: 10, // Space between rows
    alignItems: "center", // Center content like name and icon
  },
  cardImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#C8DBC4", // Slightly darker green for placeholder bg
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  cardPlantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E2E2E",
    textAlign: "center",
    marginBottom: 8,
  },
  cardDetailText: {
    fontSize: 12,
    color: "#444", // Darker grey for details
    textAlign: "center",
    marginBottom: 3,
  },
  cardDetailValue: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 6,
  }
});
