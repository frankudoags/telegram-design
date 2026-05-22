import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const DEFAULT_CARD_HEIGHT = SCREEN_HEIGHT;
const DEFAULT_CARD_WIDTH = SCREEN_WIDTH;

interface MiniCardProps {
  name: string;
  description: string;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
}

const MiniCards = ({
  name,
  description,
  isMinimized,
  setIsMinimized,
}: MiniCardProps) => {
  const insets = useSafeAreaInsets();

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      height: DEFAULT_CARD_HEIGHT,
      width: DEFAULT_CARD_WIDTH,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    };
  });

  //when we long hold this card, we want to minimize it, and when we release it, we want to maximize it
  //lets use a long press gesture to achieve this

  const tap = Gesture.LongPress()
    .onStart(() => {
      setIsMinimized(true);
    })
    .onEnd(() => {
      setIsMinimized(false);
    });

  return (
    <Animated.View style={[styles.card, animatedCardStyle]}>
      <GestureDetector gesture={tap}>
        <View style={styles.container}>
          <Text>{name}</Text>
          <Text>{description}</Text>
          <Text>{isMinimized ? "Minimized" : "Maximized"}</Text>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default MiniCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
  },
});
