import { FlatList, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NodeCard from "./node-card";
import { spacing, typography, colors } from "../../utils";
import { useChatContext } from "../../context";

interface NodeSwitcherProps {
  onSelectNode: (nodeId: string) => void;
  onClose: () => void;
}

export default function NodeSwitcher({ onSelectNode, onClose }: NodeSwitcherProps) {
  const { nodes, chats, activeNodeId } = useChatContext();
  const insets = useSafeAreaInsets();

  return (
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable
        style={[styles.panel, { paddingTop: insets.top + spacing.md }]}
        onPress={(e) => e.stopPropagation()}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Workspaces</Text>
        <FlatList
          data={nodes}
          keyExtractor={(n) => n.id}
          numColumns={3}
          renderItem={({ item }) => (
            <NodeCard
              node={item}
              chats={chats}
              isActive={item.id === activeNodeId}
              onPress={() => onSelectNode(item.id)}
            />
          )}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.overlay,
    justifyContent: "flex-start",
  },
  panel: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: spacing.xl,
    borderBottomRightRadius: spacing.xl,
    paddingBottom: spacing.xl,
    maxHeight: "70%",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.title,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  grid: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  row: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
});
