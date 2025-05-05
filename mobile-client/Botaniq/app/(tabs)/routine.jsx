import { StyleSheet, View, Text, SafeAreaView } from "react-native";

export default function Routine() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Routine</Text>
        <Text style={styles.subtitle}>Track your plant care schedule</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.message}>
          Your plant care routines will appear here
        </Text>
      </View>
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
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: "#2E2E2E",
    textAlign: "center",
  },
});
