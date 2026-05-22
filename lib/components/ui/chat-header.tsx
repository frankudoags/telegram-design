import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Pressable } from "react-native";
import Avatar from "./avatar";
import IconButton from "./icon-button";
import { spacing, typography, colors, sizing } from "../../utils";

interface ChatHeaderProps {
  mode: "list" | "chat";
  name: string;
  online?: boolean;
  nodeName?: string;
  nodeEmoji?: string;
  onBack: () => void;
  onNodeNamePress?: () => void;
}

export default function ChatHeader({
  mode,
  name,
  online,
  nodeName,
  nodeEmoji,
  onBack,
  onNodeNamePress,
}: ChatHeaderProps) {
  const insets = useSafeAreaInsets();

  if (mode === "list") {
    return (
      <View style={[styles.container, { paddingTop: insets.top || spacing.md }]}>
        <View style={styles.row}>
          <Text style={styles.editBtn}>Edit</Text>
          <Pressable onPress={onNodeNamePress} style={styles.nodeNameWrap}>
            <Text style={styles.nodeName}>
              {nodeEmoji} {nodeName}
            </Text>
            <Text style={styles.chevron}>▾</Text>
          </Pressable>
          <View style={styles.rightBtns}>
            <IconButton icon="+" onPress={() => {}} size={20} style={styles.iconBtn} />
            <IconButton icon="✏" onPress={() => {}} size={16} style={styles.iconBtn} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || spacing.md }]}>
      <View style={styles.row}>
        <IconButton icon="←" onPress={onBack} size={22} />
        <View style={styles.chatInfo}>
          <Avatar name={name} size={sizing.avatar.sm} online={online} />
          <Text style={styles.chatName} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <Pressable onPress={onNodeNamePress} style={styles.nodeNameWrapSmall}>
          <Text style={styles.nodeNameSmall}>{nodeEmoji}</Text>
        </Pressable>
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
  },
  editBtn: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
  },
  nodeNameWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  nodeName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.title,
    fontWeight: "bold",
  },
  chevron: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
  },
  rightBtns: {
    flexDirection: "row",
    gap: spacing.xs,
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
    flex: 1,
  },
  nodeNameWrapSmall: {
    padding: spacing.xs,
  },
  nodeNameSmall: {
    fontSize: typography.fontSize.subhead,
  },
});
