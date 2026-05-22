import { StyleSheet, Text, View } from "react-native";
import { spacing, typography, colors } from "../../utils";
import type { Message } from "../../types";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.senderId === "me";

  return (
    <View style={[styles.wrapper, isMe ? styles.wrapperMe : styles.wrapperThem]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        <Text style={[styles.text, isMe ? styles.textMe : styles.textThem]}>
          {message.text}
        </Text>
        <Text style={[styles.time, isMe ? styles.timeMe : styles.timeThem]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  wrapperMe: { alignItems: "flex-end" },
  wrapperThem: { alignItems: "flex-start" },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.md,
  },
  bubbleMe: {
    backgroundColor: colors.sentBubble,
    borderBottomRightRadius: spacing.xs,
  },
  bubbleThem: {
    backgroundColor: colors.receivedBubble,
    borderBottomLeftRadius: spacing.xs,
  },
  text: {
    fontSize: typography.fontSize.body,
    lineHeight: typography.fontSize.body + 5,
  },
  textMe: { color: colors.textPrimary },
  textThem: { color: colors.textPrimary },
  time: {
    fontSize: typography.fontSize.caption,
    marginTop: spacing.xs,
    alignSelf: "flex-end",
  },
  timeMe: { color: colors.textSecondary },
  timeThem: { color: colors.textTertiary },
});
