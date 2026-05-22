import { Pressable, StyleSheet, Text, View } from "react-native";
import { spacing, typography, colors, sizing } from "../../utils";
import type { ChatNode, Chat } from "../../types";

interface NodeCardProps {
  node: ChatNode;
  chats: Record<string, Chat>;
  isActive: boolean;
  onPress: () => void;
}

export default function NodeCard({ node, chats, isActive, onPress }: NodeCardProps) {
  const nodeChats = node.chatIds.map((id) => chats[id]).filter(Boolean);
  const totalUnread = nodeChats.reduce((sum, c) => sum + c.unreadCount, 0);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, isActive && { borderColor: node.color, borderWidth: 2 }]}
    >
      <Text style={styles.emoji}>{node.emoji}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {node.name}
      </Text>
      <Text style={styles.count}>{node.chatIds.length} chats</Text>
      {totalUnread > 0 && (
        <View style={[styles.badge, { backgroundColor: node.color }]}>
          <Text style={styles.badgeText}>{totalUnread}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: sizing.nodeCardSize,
    height: sizing.nodeCardSize + 20,
    backgroundColor: colors.surfaceMid,
    borderRadius: spacing.md,
    padding: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  emoji: {
    fontSize: 32,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontWeight: "600",
  },
  count: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
  },
  badge: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: "#fff",
    fontSize: typography.fontSize.caption,
    fontWeight: "bold",
  },
});
