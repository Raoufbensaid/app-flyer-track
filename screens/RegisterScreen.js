// screens/RegisterScreen.js
import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not available");
  }
  const { register } = auth;

  const handleSubmit = async () => {
    console.log("=== HANDLE SUBMIT REGISTER ===");
    console.log("Username:", username, "Email:", email, "Password:", password);
    try {
      await register(username, email, password);
      Alert.alert("Succès", "Inscription réussie");
      navigation.navigate("Login");
    } catch (err) {
      console.error("Erreur catch handleSubmit register:", err);
      setError("Erreur lors de l'inscription");
      Alert.alert("Erreur", "Erreur lors de l'inscription");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription User</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
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
      <Button title="S'inscrire" onPress={handleSubmit} />
      <Button
        title="Déjà un compte ? Se connecter"
        onPress={() => navigation.navigate("Login")}
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
