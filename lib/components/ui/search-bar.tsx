import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, spacing, typography } from "../../utils";

export default function SearchBar() {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchField}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          placeholder=""
        />
        {!value && (
          <View pointerEvents="none" style={styles.placeholderRow}>
            <Text style={styles.placeholderIcon}>⌕</Text>
            <Text style={styles.placeholderText}>Search</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceLight,
  },
  searchField: {
    position: "relative",
    backgroundColor: colors.surfaceMid,
    borderRadius: spacing.sm,
    minHeight: 44,
    justifyContent: "center",
  },
  input: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    textAlign: "center",
  },
  placeholderRow: {
    ...StyleSheet.absoluteFill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
  placeholderIcon: {
    color: colors.textTertiary,
    fontSize: typography.fontSize.largeTitle,
  },
  placeholderText: {
    color: colors.textTertiary,
    fontSize: typography.fontSize.body,
  },
});
