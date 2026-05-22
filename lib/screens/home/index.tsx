import { StyleSheet } from "react-native";
import MiniCards from "../../components/home/mini-cards";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export default function Home() {
  const isMini = useSharedValue(false);

  const setMini = (value: boolean) => {
    isMini.value = value;
  };

  // give the individual cards spacing when minimized, and make them full screen when not minimized
  const scrollViewMinimizedStyle = useAnimatedStyle(() => {
    return {
        gap: isMini.value ? 20 : 0,
    };
  });

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      contentContainerStyle={[styles.container]}
      showsHorizontalScrollIndicator={false}
        style={[styles.container]}
    >
      {swipecards.map((card, index) => (
        <MiniCards
          key={index}
          name={card.name}
          description={card.description}
          isMinimized={isMini.value}
          setIsMinimized={setMini}
        />
      ))}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const swipecards = [
  {
    name: "Card 1",
    description: "This is the first card.",
  },
  {
    name: "Card 2",
    description: "This is the second card.",
  },
  {
    name: "Card 3",
    description: "This is the third card.",
  },
  {
    name: "Card 4",
    description: "This is the fourth card.",
  },
];
