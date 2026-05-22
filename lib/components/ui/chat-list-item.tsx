import { Pressable, StyleSheet, Text, View } from "react-native";
import Avatar from "./avatar";
import { spacing, typography, colors, sizing } from "../../utils";
import type { Chat } from "../../types";

interface ChatListItemProps {
  chat: Chat;
  onPress: (chatId: string) => void;
}

export default function ChatListItem({ chat, onPress }: ChatListItemProps) {
  return (
    <Pressable onPress={() => onPress(chat.id)} style={styles.row}>
      <Avatar name={chat.name} size={sizing.avatar.md} online={chat.online} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.time}>{formatTime(chat.lastMessageTime)}</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.message} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          <View style={styles.indicators}>
            {chat.muted && <Text style={styles.mute}>🔇</Text>}
            {chat.unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{chat.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function formatTime(ts: number): string {
  const now = Date.now();
  const diff = now - ts;
  const d = new Date(ts);
  if (diff < 86400000) {
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
  if (diff < 604800000) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[d.getDay()];
  }
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.subhead,
    fontWeight: "600",
    flex: 1,
  },
  time: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    marginLeft: spacing.sm,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    flex: 1,
  },
  indicators: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginLeft: spacing.sm,
  },
  mute: {
    fontSize: typography.fontSize.caption,
  },
  badge: {
    backgroundColor: colors.unreadBadge,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontWeight: "bold",
  },
});
