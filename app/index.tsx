import { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import SplashScreen from "@/components/SplashScreen";
import About from "@/components/About";
import LogoContainer from "@/components/LogoContainer";
import ResourceScreen from "@/components/ResourceScreen";
import { response } from "@/components/mockData/benefits_mock";

interface Props {}

const Component = (props: Props) => {
  const router = useRouter();
  const [item, setItem] = useState("");

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <LogoContainer />

      <ResourceScreen data={response.data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4BA4A4",
    zIndex: 1,
    paddingHorizontal: 40,
  },
});

export default Component;
