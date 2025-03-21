// context/AuthContext.js (pour mobile-app)
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setUser({ token });
        }
      } catch (error) {
        console.log("Erreur lors de la récupération du token", error);
      }
    })();
  }, []);

  const login = async (email, password) => {
    console.log("=== LOGIN FUNCTION CALLED (Mobile) ===");
    console.log("Email:", email, "Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/login",
        { email, password }
      );
      console.log("Login response:", res.data);
      await AsyncStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error("Erreur dans login:", errorMessage);
      Alert.alert("Erreur", errorMessage);
      throw err;
    }
  };

  const register = async (username, email, password) => {
    console.log("=== REGISTER FUNCTION CALLED (Mobile) ===");
    console.log("Username:", username, "Email:", email, "Password:", password);
    try {
      const res = await axios.post(
        "https://backend-flyer-track.onrender.com/api/auth/register",
        { username, email, password, role: "user" }
      );
      console.log("Register response:", res.data);
      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
      }
      setUser(res.data.user);
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      console.error("Erreur dans register:", errorMessage);
      Alert.alert("Erreur", errorMessage);
      throw err;
    }
  };

  const logout = async () => {
    console.log("=== LOGOUT FUNCTION CALLED (Mobile) ===");
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
