import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    type SharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import type { Chat, ChatNode } from "../../types";
import { colors, SCREEN_HEIGHT, SCREEN_WIDTH, spacing } from "../../utils";
import { ChatHeader, ChatListItem, SearchBar, TabBar } from "../ui";

interface NodeChatListProps {
  node: ChatNode;
  chats: Record<string, Chat>;
  activeTab: string;
  onTabPress: (tab: string) => void;
  onChatPress: (chatId: string) => void;
  isMinimized: boolean;
  minimizedProgress: SharedValue<number>;
  onToggleMinimized: () => void;
  onSelectNode: (nodeId: string) => void;
}

export default function NodeChatList({
  node,
  chats,
  activeTab,
  onTabPress,
  onChatPress,
  isMinimized,
  minimizedProgress,
  onToggleMinimized,
  onSelectNode,
}: NodeChatListProps) {
  const nodeChats = node.chatIds
    .map((id) => chats[id])
    .filter(Boolean)
    .sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  const animatedCardStyle = useAnimatedStyle(() => {
    const width = interpolate(
      minimizedProgress.value,
      [0, 1],
      [SCREEN_WIDTH, SCREEN_WIDTH * 0.8],
      Extrapolation.CLAMP,
    );
    const height = interpolate(
      minimizedProgress.value,
      [0, 1],
      [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.8],
      Extrapolation.CLAMP,
    );
    const translateY = interpolate(minimizedProgress.value, [0, 1], [0, 12]);
    const scale = interpolate(minimizedProgress.value, [0, 1], [1, 0.98]);

    return {
      width,
      height,
      transform: [{ translateY }, { scale }],
      opacity: interpolate(minimizedProgress.value, [0, 1], [1, 0.98]),
    };
  });

  const animatedListStyle = useAnimatedStyle(() => ({
    marginTop: interpolate(minimizedProgress.value, [0, 1], [0, spacing.sm]),
  }));

  const renderItem = useCallback(
    ({ item }: { item: Chat }) => (
      <ChatListItem chat={item} onPress={onChatPress} />
    ),
    [onChatPress],
  );

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <Pressable
      disabled={!isMinimized}
      onPress={() => onSelectNode(node.id)}
      style={[
        styles.pressableSurface,
        isMinimized ? styles.minimizedSurface : styles.expandedSurface,
      ]}
    >
      <Animated.View style={[styles.container, animatedCardStyle]}>
        <View style={styles.chrome}>
          <ChatHeader
            mode="list"
            name={node.name}
            nodeEmoji={node.emoji}
            onBack={() => {}}
            onNodeNamePress={
              isMinimized ? () => onSelectNode(node.id) : onToggleMinimized
            }
            isMinimized={isMinimized}
          />
          {!isMinimized && (
            <>
              <SearchBar />
              <TabBar
                tabs={node.tabs}
                activeTab={activeTab}
                onTabPress={onTabPress}
              />
            </>
          )}
        </View>
        <View
          pointerEvents={isMinimized ? "none" : "auto"}
          style={styles.listShell}
        >
          <Animated.FlatList
            data={nodeChats}
            keyExtractor={(c) => c.id}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            contentContainerStyle={styles.listContent}
            style={[styles.list, animatedListStyle]}
            showsVerticalScrollIndicator={false}
            scrollEnabled={isMinimized}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableSurface: {
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  minimizedSurface: {
    padding: spacing.md,
  },
  expandedSurface: {
    backgroundColor: colors.background,
  },
  container: {
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: colors.surfaceLight,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  chrome: {
    backgroundColor: colors.surfaceLight,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  listShell: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
  },
  list: {
    backgroundColor: colors.surfaceLight,
  },
  listContent: {
    paddingVertical: spacing.xs,
    flexGrow: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    marginLeft: spacing.xxl + 44,
    marginRight: spacing.lg,
  },
});
