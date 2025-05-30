import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { registerUser } from "../apis/AuthAPI";
import { authStyles as styles } from "../styles/authStyles";
import { RootStackParamList } from "../types";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

export function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  async function submit() {
    if (!name || !email || !password) {
      Alert.alert("Registration Failed", "All fields are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const message = await registerUser(name, email, password);
      Alert.alert("Success", message, [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err: any) {
      Alert.alert(
        "Registration Failed",
        err.message || "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/80' }} 
              style={styles.logo} 
              resizeMode="contain"
            />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={[
                styles.input,
                isFocused.name && { borderColor: '#5E72E4', borderWidth: 2 }
              ]}
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              onFocus={() => setIsFocused({ ...isFocused, name: true })}
              onBlur={() => setIsFocused({ ...isFocused, name: false })}
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={[
                styles.input,
                isFocused.email && { borderColor: '#5E72E4', borderWidth: 2 }
              ]}
              placeholder="youremail@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsFocused({ ...isFocused, email: true })}
              onBlur={() => setIsFocused({ ...isFocused, email: false })}
            />
          </View>

          <View>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={[
                styles.input,
                isFocused.password && { borderColor: '#5E72E4', borderWidth: 2 }
              ]}
              placeholder="Create a password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text>in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}