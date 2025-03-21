// screens/LoginScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not available");
  }
  const { login } = auth;

  const handleSubmit = async () => {
    console.log("=== HANDLE SUBMIT LOGIN ===");
    console.log("Email:", email, "Password:", password);
    try {
      await login(email, password);
      Alert.alert("Succès", "Connexion réussie");
      navigation.navigate("Dashboard");
    } catch (err) {
      console.error("Erreur catch handleSubmit login:", err);
      setError("Erreur lors de la connexion");
      Alert.alert("Erreur", "Erreur lors de la connexion");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleSubmit} />
      <Button
        title="Pas de compte ? S'inscrire"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
