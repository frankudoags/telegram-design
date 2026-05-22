import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Picker, Host } from "@expo/ui";
import Avatar from "./avatar";
import IconButton from "./icon-button";
import { spacing, typography, colors, sizing } from "../../utils";
import type { ChatNode } from "../../types";

interface ChatHeaderProps {
  mode: "list" | "chat";
  name: string;
  online?: boolean;
  nodeEmoji?: string;
  onBack: () => void;
  activeNodeId?: string;
  nodes?: ChatNode[];
  onNodeSelect?: (nodeId: string) => void;
}

export default function ChatHeader({
  mode,
  name,
  online,
  nodeEmoji,
  onBack,
  activeNodeId,
  nodes,
  onNodeSelect,
}: ChatHeaderProps) {
  const insets = useSafeAreaInsets();

  if (mode === "list") {
    return (
      <Host matchContents>
      <View style={[styles.container, { paddingTop: insets.top || spacing.md }]}>
        <View style={styles.row}>
          <Text style={styles.editBtn}>Edit</Text>
          <View style={styles.nodeNameWrap}>
            <Picker
              selectedValue={activeNodeId ?? ""}
              onValueChange={(value: string) => {
                onNodeSelect?.(value);
              }}
              appearance="menu"
            >
              {nodes?.map((node) => (
                <Picker.Item
                  key={node.id}
                  label={`${node.emoji} ${node.name}`}
                  value={node.id}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.rightBtns}>
            <IconButton icon="+" onPress={() => {}} size={20} style={styles.iconBtn} />
            <IconButton icon="✏" onPress={() => {}} size={16} style={styles.iconBtn} />
          </View>
        </View>
      </View>
      </Host>
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
        <View style={styles.nodeNameWrapSmall}>
          <Text style={styles.nodeNameSmall}>{nodeEmoji}</Text>
        </View>
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
