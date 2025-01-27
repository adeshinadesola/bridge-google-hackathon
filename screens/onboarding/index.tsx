import * as React from "react";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

import CTAButton from "@/components/buttons/CTAButton";
import { window } from "@/constants/Web";
import { useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carouseltem from "./Carouseltem";
import Color from "@/constants/Color";
import LeftCaret from "@/components/svgs/LeftCaret";
import RightCaret from "@/components/svgs/RightCaret";

type Props = {};

const PAGE_WIDTH = window.width;

const Onboarding = (props: Props) => {
  const windowWidth = useWindowDimensions().width;
  const scrollOffsetValue = useSharedValue<number>(0);
  const [data, setData] = React.useState([...new Array(4).keys()]);
  const [isPagingEnabled, setIsPagingEnabled] = React.useState(true);
  const ref = React.useRef<ICarouselInstance>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const router = useRouter();

  const goToPrev = () => {
    if (ref && ref.current) {
      ref.current.prev();
    }
  };

  const goToNext = () => {
    if (ref && ref.current) {
      console.log("did next")
      ref.current.next();
    }
  };

  const components = [
    <Image resizeMode="contain" style={styles.illustration} source={require("@/assets/images/bridge-buddy-a.png")} />,
    <Image resizeMode="contain" style={styles.illustration} source={require("@/assets/images/bridge-buddy-b.png")} />,
    <Image resizeMode="contain" style={styles.illustration} source={require("@/assets/images/bridge-buddy-c.png")} />,
    <Image resizeMode="contain" style={styles.illustration} source={require("@/assets/images/bridge-buddy-d.png")} />,
  ];
  const titles = [
    "Bridge Buddy",
    "What's Next",
    "Why are you asking?",
    "Ready to get started?",
  ];
  const descriptions = [
    "Bridge Buddy is a chatbot that will guide you through this process. Think of it as having a conversation with a helpful friend... that's a friendly robot!",
    "When you use the app, the chatbot (Bridge Buddy) will ask you questions to understand your needs. Don't worry, everything you say is private!",
    "Based on your answers, it will find and provide you with information and resources to best assist you and your needs.",
    "Once you complete the process you'll be able to save your resources for later - whenever you need them!",
  ];
  const baseOptions = {
    vertical: false,
    width: windowWidth,
    height: PAGE_WIDTH / 2,
  } as const;

  const renderDots = () => {
    const newData = [data[0], data[1], data[2]];
    return (
      <View
        style={[styles.dotContainer, { opacity: currentIndex === 3 ? 0 : 1 }]}
      >
        {newData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentIndex === index ? "#404040" : "white",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const isLeftArrowVisible = (currentIndex: number) => currentIndex === 1 || currentIndex === 2


  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: Color.accentPrimary,
      }}
    >
      <Carousel
        {...baseOptions}
        loop
        enabled // Default is true, just for demo
        ref={ref}
        defaultScrollOffsetValue={scrollOffsetValue}
        testID={"xxx"}
        style={{ height: 580 }}
        data={data}
        onScrollStart={() => {
          console.log("===1");
        }}
        onScrollEnd={() => {
          console.log("===2");
        }}
        onConfigurePanGesture={(g: any) => g.enabled(false)}
        pagingEnabled={isPagingEnabled}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ index }) => (
          <Carouseltem
            key={index}
            component={components[index]}
            title={titles[index]}
            description={descriptions[index]}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: windowWidth,
          paddingHorizontal: 20,
          alignItems: "center",
          height: 48
        }}
      >
        {isLeftArrowVisible(currentIndex) ? (
          <Pressable onPress={goToPrev}>
            <LeftCaret />
          </Pressable>
        ) : (
          <View style={{ width: 14, height: 24 }}></View>
        )}
        {renderDots()}
        {currentIndex !== 3 ? (
          <Pressable onPress={goToNext}>
            <RightCaret />
          </Pressable>
        ) : (
          <View style={{ width: 30, height: 30 }}></View>
        )}
        {currentIndex === 3 ? (
          <CTAButton
            type="primary"
            text="Continue"
            onPress={() => {
              router.replace("/chat-immigration-status");
            }}
            style={{
              position: "absolute",
              bottom: -10,
              right: 20,
              marginTop: 24,
            }}
          />
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    marginHorizontal: 4,
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontFamily: "KarlaRegular",
    fontSize: 19,
    lineHeight: 28,
    textDecorationLine: "underline",
    color: "white",
  },
  illustration: {
    width: 196,
    height: 262
  }
});

export default Onboarding;
