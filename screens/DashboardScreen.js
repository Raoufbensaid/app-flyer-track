// screens/DashboardScreen.js
import React, { useContext, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

export default function DashboardScreen() {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext not available");
  }
  const { user, logout } = auth;

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  if (!user) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text>Bienvenue {user.username || user.email}!</Text>
      <Button
        title="Déconnexion"
        onPress={() => {
          logout();
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
