/*import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  cancelReservation,
  fetchReservations,
  removeReservation,
} from "../apis/ReservationAPI";
import { restaurantStyles as styles } from "../styles/restaurantStyles";
import { Reservation } from "../types";

export function ReservationsScreen() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadReservations() {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (err: any) {
      console.error("Failed to fetch reservations:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadReservations();
    }, [])
  );

  function onRefresh() {
    setRefreshing(true);
    loadReservations();
  }

  function confirm(action: string, cb: (uuid: string) => void, uuid: string) {
    Alert.alert(
      "Confirm",
      `Are you sure you want to ${action} the reservation?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => cb(uuid),
        },
      ],
      { cancelable: true }
    );
  }

  async function cancel(uuid: string) {
    try {
      await cancelReservation(uuid);
      await loadReservations();
    } catch (err: any) {
      console.error("Failed to cancel reservation:", err.message);
    }
  }

  async function remove(uuid: string) {
    try {
      await removeReservation(uuid);
      await loadReservations();
    } catch (err: any) {
      console.error("Failed to remove reservation:", err.message);
    }
  }

  const renderReservation = ({ item }: { item: Reservation }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text>
        {new Date(`${item.date.split("T")[0]}T${item.time}`)
          .toLocaleString()
          .replace(",", " at")}
      </Text>
      <Text style={styles.value}>People: {item.people}</Text>
      <Text style={{ ...styles.value, marginTop: -4 }}>
        Status: {item.status}
      </Text>
      {item.status != "cancelled" ? (
        <TouchableOpacity
          onPress={() => confirm("cancel", cancel, item.uuid)}
          disabled={loading}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          width: 24,
          height: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => confirm("remove", remove, item.uuid)}
      >
        <Text style={{ fontSize: 16 }}>x</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    <View style={styles.centered}>
      <ActivityIndicator size="large" />
    </View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.uuid}
        renderItem={renderReservation}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>No reservations found.</Text>
        }
      />
    </View>
  );
}*/

import Icon from "@react-native-vector-icons/ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  cancelReservation,
  fetchReservations,
  removeReservation,
} from "../apis/ReservationAPI";
import { designSystem } from "../styles/baseStyles";
import { restaurantStyles as styles } from "../styles/restaurantStyles";
import { Reservation } from "../types";

const { colors } = designSystem;

export function ReservationsScreen() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadReservations() {
    try {
      const data = await fetchReservations();
      setReservations(data);
    } catch (err: any) {
      console.error("Failed to fetch reservations:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadReservations();
    }, [])
  );

  function onRefresh() {
    setRefreshing(true);
    loadReservations();
  }

  function confirm(action: string, cb: (uuid: string) => void, uuid: string) {
    Alert.alert(
      "Confirm",
      `Are you sure you want to ${action} the reservation?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => cb(uuid),
        },
      ],
      { cancelable: true }
    );
  }

  async function cancel(uuid: string) {
    try {
      await cancelReservation(uuid);
      await loadReservations();
    } catch (err: any) {
      console.error("Failed to cancel reservation:", err.message);
    }
  }

  async function remove(uuid: string) {
    try {
      await removeReservation(uuid);
      await loadReservations();
    } catch (err: any) {
      console.error("Failed to remove reservation:", err.message);
    }
  }

  const renderReservation = ({ item }: { item: Reservation }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.value}>
          {new Date(`${item.date.split("T")[0]}T${item.time}`)
            .toLocaleString()
            .replace(",", " at")}
        </Text>
        <View style={[styles.cardMeta, { marginTop: 8 }]}>
          <View style={styles.cardRating}>
            <Icon name="people" size={16} color={colors.gray600} />
            <Text style={styles.ratingText}>{item.people}</Text>
          </View>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            backgroundColor: item.status === 'cancelled' ? colors.gray200 : colors.primary,
            borderRadius: 12,
          }}>
            <Text style={{
              fontSize: 12,
              color: item.status === 'cancelled' ? colors.gray700 : colors.white,
            }}>
              {item.status}
            </Text>
          </View>
        </View>
        
        {item.status !== "cancelled" && (
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryAction, { marginTop: 12 }]}
            onPress={() => confirm("cancel", cancel, item.uuid)}
            disabled={loading}
          >
            <Icon name="close-circle-outline" size={16} color={colors.primary} />
            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>Cancel Reservation</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: colors.gray200,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => confirm("remove", remove, item.uuid)}
      >
        <Icon name="trash-outline" size={16} color={colors.gray700} />
      </TouchableOpacity>
    </View>
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
      <Text style={styles.title}>My Reservations</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={reservations}
        keyExtractor={(item) => item.uuid}
        renderItem={renderReservation}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[colors.primary]} 
          />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="calendar-outline" size={60} style={styles.emptyIcon} color={colors.gray400} />
            <Text style={styles.emptyText}>No reservations found</Text>
            <Text style={styles.emptySubtext}>Your upcoming reservations will appear here</Text>
          </View>
        }
      />
    </View>
  );
}