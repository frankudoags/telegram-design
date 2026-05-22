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

  const animatedContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(minimizedProgress.value, [0, 1], [1, 0.98], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    const translateY = interpolate(minimizedProgress.value, [0, 1], [0, 12]);
    const width = interpolate(
      minimizedProgress.value,
      [0, 1],
      [SCREEN_WIDTH, SCREEN_WIDTH * 0.9],
      Extrapolation.CLAMP,
    );
    const height = interpolate(
      minimizedProgress.value,
      [0, 1],
      [SCREEN_HEIGHT, SCREEN_HEIGHT * 0.78],
      Extrapolation.CLAMP,
    );

    return {
      transform: [{ scale }, { translateY }],
      opacity: interpolate(minimizedProgress.value, [0, 1], [1, 0.98]),
      width,
      height,
    };
  }, [minimizedProgress]);

  const animatedChromeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(minimizedProgress.value, [0, 1], [1, 0]),
    transform: [
      {
        translateY: interpolate(minimizedProgress.value, [0, 1], [0, -10]),
      },
    ],
  }));

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
    () => (isMinimized ? <View style={styles.separator} /> : null),
    [isMinimized],
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
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.View style={[styles.chrome, animatedChromeStyle]}>
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
        </Animated.View>
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
    backgroundColor: colors.surfaceMid,
    padding: spacing.md,
  },
  expandedSurface: {
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: colors.surfaceLight,
  },
  chrome: {
    backgroundColor: colors.surfaceLight,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
