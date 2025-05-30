import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { authStyles as styles } from "../styles/authStyles";
import { RootStackParamList } from "../types";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const navigation = useNavigation<LoginScreenNavigationProp>();

  async function submit() {
    if (!email || !password) {
      Alert.alert("Login Failed", "Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err: any) {
      console.error("Login error stack:", err);
      let message = "Something went wrong.";
      if (
        err?.message?.includes("Invalid") ||
        err?.message?.includes("Unauthorized")
      ) {
        message = "Invalid email or password. Please try again.";
      } else if (err?.message) {
        message = err.message;
      }
      Alert.alert("Login Failed", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          {/* You can add a logo here */}
          <Image 
            source={{ uri: 'https://via.placeholder.com/80' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue using the app</Text>
        </View>

        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[
              styles.input,
              isFocused.email && { borderColor: '#5E72E4', borderWidth: 2 }
            ]}
            placeholder="youremail@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
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
            placeholder="Your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsFocused({ ...isFocused, password: true })}
            onBlur={() => setIsFocused({ ...isFocused, password: false })}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          disabled={isSubmitting}
          onPress={submit}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}