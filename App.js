import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Stack = createNativeStackNavigator();

function PhoneValidationScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const getOnlyDigits = (text) => {
    return text.replace(/\D/g, "");
  };

  const formatPhoneNumber = (text) => {
    const digits = getOnlyDigits(text).slice(0, 10);

    if (digits.length <= 3) return digits;

    if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    }

    if (digits.length <= 8) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }

    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      8
    )} ${digits.slice(8, 10)}`;
  };

  const isValidPhone = (text) => {
    const digits = getOnlyDigits(text);
    return /^0\d{9}$/.test(digits);
  };

  const handleChangePhone = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);

    if (formatted.length === 0) {
      setError("");
      return;
    }

    if (!isValidPhone(formatted)) {
      setError("Số điện thoại không đúng định dạng");
      return;
    }

    setError("");
  };

  const handleContinue = () => {
    if (!isValidPhone(phone)) {
      Alert.alert("Thông báo", "Số điện thoại không đúng định dạng");
      return;
    }

    navigation.navigate("Home", { phone });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Text style={styles.subtitle}>Nhập số điện thoại</Text>

        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={handleChangePhone}
          maxLength={13}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ route }) {
  const phone = route.params?.phone ?? "";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeContent}>

        <Text style={styles.homeDescription}>
          Bạn đã đăng nhập thành công bằng số điện thoại:
        </Text>
        <Text style={styles.homePhone}>{phone}</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Stack.Screen
          name="PhoneValidation"
          component={PhoneValidationScreen}
          options={{ title: "Đăng nhập" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },

  content: {
    padding: 20,
    marginTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "white",
  },

  inputError: {
    borderColor: "red",
  },

  errorText: {
    color: "red",
    marginTop: 6,
  },

  button: {
    backgroundColor: "#2563eb",
    marginTop: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  homeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  homeBadge: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },

  homeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
  },

  homeDescription: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },

  homePhone: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2563eb",
  },
});
