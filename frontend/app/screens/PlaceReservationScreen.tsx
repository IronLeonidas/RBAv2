import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { placeReservation } from "../apis/RestaurantsAPI";
import { restaurantStyles as styles } from "../styles/restaurantStyles";
import { RootStackParamList } from "../types";

type PlaceReservationRouteProp = RouteProp<
  RootStackParamList,
  "PlaceReservation"
>;

export function PlaceReservationScreen() {
  const navigation = useNavigation();
  const { params } = useRoute<PlaceReservationRouteProp>();
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function submit() {
    if (!date || !people) {
      Alert.alert("Reservation Failed", "Date and people are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await placeReservation(params.id, date, people);
      setHasSubmitted(true);
    } catch (err: any) {
      Alert.alert("Reservation Failed", err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function showPicker(currentMode: "date" | "time") {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (_, d) => setDate(d || date),
      mode: currentMode,
      is24Hour: true,
    });
  }

  if (hasSubmitted) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <Text style={styles.detailTitle}>Reservation Confirmed!</Text>
          <Text style={styles.emptyText}>
            Your reservation at {params?.name} has been successfully placed.
          </Text>
          <Text style={styles.emptySubtext}>
            {date.toLocaleDateString()} at {date.toLocaleTimeString()} for {people} {people === 1 ? 'person' : 'people'}
          </Text>
          
          <TouchableOpacity 
            style={[styles.submitButton, { marginTop: 30 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.submitButtonText}>Back to Restaurant</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.formContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.formTitle}>Make a Reservation</Text>
      <Text style={styles.value}>{params?.name}</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.formLabel}>Date</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            value={date.toLocaleDateString()}
            editable={false}
          />
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryAction, { width: 100 }]}
            onPress={() => showPicker("date")}
          >
            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.formLabel}>Time</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 10 }]}
            value={date.toLocaleTimeString()}
            editable={false}
          />
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryAction, { width: 100 }]}
            onPress={() => showPicker("time")}
          >
            <Text style={[styles.actionButtonText, styles.secondaryActionText]}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.formSection}>
        <Text style={styles.formLabel}>Number of People</Text>
        <TextInput
          style={[
            styles.input,
            isFocused && { borderColor: '#5E72E4', borderWidth: 2 }
          ]}
          placeholder="How many people?"
          keyboardType="numeric"
          value={people.toString() === "0" ? "" : people.toString()}
          onChangeText={(p) => setPeople(parseInt(p) || 0)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      
      <TouchableOpacity
        style={styles.submitButton}
        disabled={isSubmitting}
        onPress={submit}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Confirm Reservation</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}