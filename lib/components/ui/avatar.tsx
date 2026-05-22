import { View, StyleSheet } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { sizing, typography } from "../../utils";

interface AvatarProps {
  name: string;
  size?: number;
  online?: boolean;
}

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function Avatar({ name, size = sizing.avatar.md, online }: AvatarProps) {
  const initials = name.slice(0, 2).toUpperCase();
  const color = getColor(name);
  const fontSize = size * 0.4;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
        <SvgText
          x={size / 2}
          y={size / 2 + fontSize * 0.35}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight="bold"
          fill="white"
        >
          {initials}
        </SvgText>
      </Svg>
      {online && (
        <View
          style={[
            styles.onlineDot,
            {
              width: size * 0.25,
              height: size * 0.25,
              borderRadius: size * 0.125,
              right: 2,
              bottom: 2,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  onlineDot: {
    position: "absolute",
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
});
