import Icon from "@react-native-vector-icons/ionicons";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { fetchRestaurantById } from "../apis/RestaurantsAPI";
import { designSystem } from "../styles/baseStyles";
import { restaurantStyles as styles } from "../styles/restaurantStyles";
import { Restaurant, RootStackParamList } from "../types";

const { colors } = designSystem;

type RestaurantRouteProp = RouteProp<RootStackParamList, "Restaurant">;
type RestaurantScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Restaurant"
>;

export function RestaurantScreen() {
  const { params } = useRoute<RestaurantRouteProp>();
  const navigation = useNavigation<RestaurantScreenNavigationProp>();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadRestaurant() {
    if (!params?.id) return;
    try {
      const data = await fetchRestaurantById(params.id);
      setRestaurant(data);
    } catch (err: any) {
      Alert.alert("Error", err.message || "Could not load restaurant details.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadRestaurant();
    }, [params?.id])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.empty}>
        <Icon name="restaurant-outline" size={60} style={styles.emptyIcon} color={colors.gray400} />
        <Text style={styles.emptyText}>Restaurant not found</Text>
        <Text style={styles.emptySubtext}>We couldn't find the restaurant you're looking for</Text>
      </View>
    );
  }

  if (!params?.id) {
    return (
      <View style={styles.empty}>
        <Icon name="alert-circle-outline" size={60} style={styles.emptyIcon} color={colors.gray400} />
        <Text style={styles.emptyText}>Invalid restaurant ID</Text>
        <Text style={styles.emptySubtext}>Please go back and try again</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>{restaurant.name}</Text>
        <View style={styles.detailMeta}>
          <View style={styles.rating}>
            <Icon name="star" size={18} color={colors.warning} />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.cuisine}>Fine Dining</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.value}>{restaurant.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.value}>{restaurant.location}</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryAction]} 
          onPress={() => navigation.navigate("PlaceReservation", {
            name: restaurant.name,
            id: restaurant.uuid,
          })}
        >
          <Icon name="calendar-outline" size={18} color={colors.white} />
          <Text style={[styles.actionButtonText, styles.primaryActionText]}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
