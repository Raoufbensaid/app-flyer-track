import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend-flyer-track.onrender.com/")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{data ? "API Connectée, Good !" : "Chargement..."}</Text>
    </View>
  );
}
