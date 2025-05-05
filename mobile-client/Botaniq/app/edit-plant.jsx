import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function EditPlant() {
  const router = useRouter();
  const [plantData, setPlantData] = useState({
    name: "Rose",
    scientificName: "Rosa",
    sunlight: "Full Sun",
    water: "Every 2-3 days",
    soilType: "Loamy",
  });

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
            <MaterialCommunityIcons
              name="close"
              size={32}
              color="#2E2E2E"
              style={styles.crossIcon}
            />
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
  },
  crossIcon: {
    transform: [{ rotate: "45deg" }],
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
