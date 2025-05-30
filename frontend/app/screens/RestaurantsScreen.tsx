import Icon from "@react-native-vector-icons/ionicons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { fetchRestaurants } from "../apis/RestaurantsAPI";
import { designSystem } from "../styles/baseStyles";
import { restaurantStyles as styles } from "../styles/restaurantStyles";
import { Restaurant, RootStackParamList } from "../types";

const { colors } = designSystem;

type RestaurantsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Restaurants"
>;

export default function RestaurantsScreen() {
  const navigation = useNavigation<RestaurantsScreenNavigationProp>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  async function loadRestaurants() {
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
    } catch (err: any) {
      console.error("Failed to fetch restaurants:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadRestaurants();
    }, [])
  );

  function onRefresh() {
    setRefreshing(true);
    loadRestaurants();
  }

  const filteredRestaurants = searchQuery
    ? restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : restaurants;

  const renderRestaurant = ({ item }: { item: Restaurant }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Restaurant", { id: item.uuid })}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.cardMeta}>
          <View style={styles.cardRating}>
            <Icon name="star" size={16} color={colors.warning} />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.cardLocation}>{item.location}</Text>
        </View>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>$$</Text>
          <Text style={styles.cardCuisine}>Fine Dining</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color={colors.gray600} style={styles.searchIcon} />
      </View>
      
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={filteredRestaurants}
        keyExtractor={(item) => item.uuid}
        renderItem={renderRestaurant}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]} 
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="restaurant-outline" size={60} style={styles.emptyIcon} color={colors.gray400} />
            <Text style={styles.emptyText}>No restaurants found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery 
                ? "Try adjusting your search criteria"
                : "Restaurants will appear here once available"}
            </Text>
          </View>
        }
      />
    </View>
  );
}