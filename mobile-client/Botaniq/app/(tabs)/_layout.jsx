import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A8BCA1",
        tabBarInactiveTintColor: "#2E2E2E",
        tabBarStyle: {
          backgroundColor: "#F8F8F2",
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: "Garden",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sprout" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clock-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
