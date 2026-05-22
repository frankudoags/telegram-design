import { useCallback } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import IconButton from "./icon-button";
import { spacing, typography, colors, sizing } from "../../utils";

interface InputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
}

export default function InputBar({ value, onChangeText, onSend }: InputBarProps) {
  const handleSend = useCallback(() => {
    if (value.trim()) onSend();
  }, [value, onSend]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Message..."
          placeholderTextColor={colors.textTertiary}
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
      </View>
      <IconButton
        icon="↑"
        onPress={handleSend}
        size={20}
        color={colors.primary}
        style={styles.sendBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceLight,
    gap: spacing.sm,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: colors.surfaceMid,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    padding: 0,
  },
  sendBtn: {
    width: sizing.iconButton,
    height: sizing.iconButton,
    borderRadius: sizing.iconButton / 2,
    backgroundColor: colors.surfaceMid,
  },
});
