import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors, sizing, spacing, typography } from "../../utils";
import Avatar from "./avatar";
import IconButton from "./icon-button";

interface ChatHeaderProps {
  mode: "list" | "chat";
  name: string;
  online?: boolean;
  nodeEmoji?: string;
  onBack: () => void;
  onNodeNamePress?: () => void;
  isMinimized?: boolean;
}

export default function ChatHeader({
  mode,
  name,
  online,
  nodeEmoji,
  onBack,
  onNodeNamePress,
  isMinimized = false,
}: ChatHeaderProps) {
  const insets = useSafeAreaInsets();

  if (mode === "list") {
    if (isMinimized) {
      return (
        <View
          style={[styles.container, { paddingTop: insets.top || spacing.md }]}
        >
          <View style={styles.row}>
            <View
              style={[styles.leftSlot, styles.hiddenSlot]}
              pointerEvents="none"
            />
            <Pressable
              accessibilityRole="button"
              onPress={onNodeNamePress}
              style={styles.nodeNameButton}
            >
              <View style={styles.nodeNameMain}>
                <View style={styles.avatarCluster}>
                  <GradientAvatar name={`${name}-1`} size={30} />
                  <View style={styles.avatarOverlap}>
                    <GradientAvatar name={`${name}-2`} size={30} />
                  </View>
                </View>
                <Text
                  style={styles.chatName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {name}
                </Text>
              </View>
              <View style={styles.chevronButton}>
                <Text style={styles.chevronIcon}>⌄</Text>
              </View>
            </Pressable>
            <View
              style={[styles.rightBtns, styles.hiddenSlot]}
              pointerEvents="none"
            />
          </View>
        </View>
      );
    }

    return (
      <View
        style={[styles.container, { paddingTop: insets.top || spacing.md }]}
      >
        <View style={styles.row}>
          <View style={styles.leftSlot}>
            <Text style={styles.editBtn}>Edit</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={onNodeNamePress}
            style={styles.nodeNameButton}
          >
            <View style={styles.nodeNameMain}>
              <View style={styles.avatarCluster}>
                <GradientAvatar name={`${name}-1`} size={30} />
                <View style={styles.avatarOverlap}>
                  <GradientAvatar name={`${name}-2`} size={30} />
                </View>
              </View>
              <Text
                style={styles.chatName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {name}
              </Text>
            </View>
            <View style={styles.chevronButton}>
              <Text style={styles.chevronIcon}>⌄</Text>
            </View>
          </Pressable>
          <View style={styles.rightBtns}>
            <IconButton
              icon="+"
              onPress={() => {}}
              size={18}
              color="black"
              style={styles.iconBtn}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || spacing.md }]}>
      <View style={styles.row}>
        <IconButton icon="←" color="black" onPress={onBack} size={22} />
        <View style={styles.chatInfo}>
          <Avatar name={name} size={sizing.avatar.sm} online={online} />
          <Text style={styles.chatName} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
}

function GradientAvatar({ name, size }: { name: string; size: number }) {
  const ring = 2;
  const gradientId = `avatar-gradient-${name.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FF4D8D" />
            <Stop offset="100%" stopColor="#FFB54A" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={`url(#${gradientId})`}
        />
      </Svg>
      <View style={{ position: "absolute", left: ring, top: ring }}>
        <Avatar name={name} size={size - ring * 2} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  minimizedRow: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  editBtn: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
  },
  leftSlot: {
    width: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  nodeNameButton: {
    flexGrow: 0,
    flexShrink: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    minWidth: 0,
  },
  hiddenSlot: {
    opacity: 0,
  },
  nodeNameMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minWidth: 0,
  },
  avatarCluster: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
  },
  avatarOverlap: {
    marginLeft: -8,
  },
  chevronButton: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  chevronIcon: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    lineHeight: typography.fontSize.body,
    marginTop: -2,
  },
  rightBtns: {
    flexDirection: "row",
    gap: spacing.xs,
    width: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  iconBtn: {
    width: sizing.iconButton,
    height: sizing.iconButton,
    borderRadius: sizing.iconButton / 2,
    backgroundColor: colors.surfaceMid,
  },
  chatInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
  chatName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.subhead,
    fontWeight: "600",
    flexShrink: 1,
  },
});
