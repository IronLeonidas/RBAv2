/*import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { splashStyles as styles } from "../styles/splashStyles";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant App</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
    </View>
  );
}*/

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { designSystem } from "../styles/baseStyles";
import { splashStyles as styles } from "../styles/splashStyles";

const { colors } = designSystem;

export default function SplashScreen() {

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.light, colors.white]}
        style={styles.gradientBackground}
      />
      
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/icon.png')} // Replace with your app logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>FoodTable</Text>
        <Text style={styles.subtitle}>
          Discover and reserve at your favorite restaurants
        </Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator 
          size="large" 
          color={colors.primary} 
          style={styles.spinner} 
        />
        <Text style={styles.loadingText}>Setting up your experience...</Text>
      </View>
    </View>
  );
}