import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import { PlaceReservationScreen } from "../screens/PlaceReservationScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RestaurantScreen } from "../screens/RestaurantScreen";
import SplashScreen from "../screens/SplashScreen";
import { RootStackParamList } from "../types";
import { TabNavigator } from "./TabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!userToken ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="PlaceReservation"
            component={PlaceReservationScreen}
            options={{
              title: "Place Reservation",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
