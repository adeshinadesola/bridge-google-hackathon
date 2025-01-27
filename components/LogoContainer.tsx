import React from "react";
import { View, Image } from "react-native";
import Color from "@/constants/Color";
const LogoContainer = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: Color.accentPrimary,
      }}
    >
      <Image
        source={require("../assets/images/bridgelogo.png")}
        style={{
          resizeMode: "contain",
          width: 100,
          height: 60,
        }}
      />
    </View>
  );
};

export default LogoContainer;
