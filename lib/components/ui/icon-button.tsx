import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export default function IconButton({
  icon,
  onPress,
  size = 24,
  color = "#fff",
  style,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress} hitSlop={8} style={[styles.button, style]}>
      <Text style={{ fontSize: size, color }}>{icon}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
