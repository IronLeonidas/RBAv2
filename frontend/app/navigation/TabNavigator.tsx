import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { ReservationsScreen } from "../screens/ReservationsScreen";
import RestaurantsScreen from "../screens/RestaurantsScreen";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { logout } = useContext(AuthContext);

  const logoutButton = () => (
    <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
      <Text style={{ color: "#007AFF" }}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerRight: logoutButton,
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          headerRight: logoutButton,
        }}
      />
    </Tab.Navigator>
  );
}
