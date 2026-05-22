import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useChatContext } from "../../context";
import {
  colors,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  spacing,
  typography,
} from "../../utils";
import { IconButton } from "../ui";
import NodeChatList from "./node-chat-list";

export default function ChatListScreen() {
  const { nodes, chats, activeNodeId, activeTab, setActiveTab, setActiveNode } =
    useChatContext();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const minimizedProgress = useSharedValue(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const minimizedItemWidth = SCREEN_WIDTH * 0.9;
  const minimizedItemGap = spacing.lg;
  const minimizedItemOffset = minimizedItemWidth + minimizedItemGap;

  useEffect(() => {
    const index = nodes.findIndex((n) => n.id === activeNodeId);
    if (index >= 0) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [activeNodeId, nodes]);

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      setActiveNode(nodeId);
    },
    [setActiveNode],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: any) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / SCREEN_WIDTH);
      const node = nodes[index];
      if (node && node.id !== activeNodeId) {
        setActiveNode(node.id);
      }
    },
    [nodes, activeNodeId, setActiveNode],
  );

  const handleChatPress = useCallback(
    (chatId: string) => {
      router.push(`/chat/${chatId}`);
    },
    [router],
  );

  const handleToggleMinimized = useCallback(() => {
    setIsMinimized((current) => {
      const next = !current;
      minimizedProgress.value = withTiming(next ? 1 : 0, { duration: 220 });
      return next;
    });
  }, [minimizedProgress]);

  const handleSelectNode = useCallback(
    (nodeId: string) => {
      setActiveNode(nodeId);
    },
    [setActiveNode],
  );

  const animatedDockStyle = useAnimatedStyle(() => ({
    opacity: interpolate(minimizedProgress.value, [0, 1], [0, 1], {
      extrapolateRight: Extrapolation.CLAMP,
    }),
    transform: [
      {
        translateY: interpolate(minimizedProgress.value, [0, 1], [24, 0]),
      },
    ],
  }));

  const renderSeparator = useCallback(() => {
    return isMinimized ? <View style={styles.itemGap} /> : null;
  }, [isMinimized]);

  const renderItem = useCallback(
    ({ item }: { item: (typeof nodes)[number] }) => (
      <View style={isMinimized ? styles.minimizedItem : styles.expandedItem}>
        <NodeChatList
          node={item}
          chats={chats}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          onChatPress={handleChatPress}
          isMinimized={isMinimized}
          minimizedProgress={minimizedProgress}
          onToggleMinimized={handleToggleMinimized}
          onSelectNode={handleSelectNode}
        />
      </View>
    ),
    [
      chats,
      activeTab,
      setActiveTab,
      handleChatPress,
      isMinimized,
      minimizedProgress,
      handleToggleMinimized,
      handleSelectNode,
    ],
  );

  const chatCount = activeNode.chatIds.length;
  const onlineCount = activeNode.chatIds.filter(
    (chatId) => chats[chatId]?.online,
  ).length;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={nodes}
        keyExtractor={(n) => n.id}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        horizontal
        pagingEnabled={!isMinimized}
        snapToInterval={isMinimized ? minimizedItemOffset : undefined}
        snapToAlignment={isMinimized ? "center" : undefined}
        decelerationRate={isMinimized ? "fast" : "normal"}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        contentContainerStyle={
          isMinimized ? styles.minimizedListContent : styles.expandedListContent
        }
        getItemLayout={(_, index) => ({
          length: isMinimized ? minimizedItemWidth : SCREEN_WIDTH,
          offset: isMinimized
            ? minimizedItemOffset * index
            : SCREEN_WIDTH * index,
          index,
        })}
      />
      <Animated.View
        style={[styles.bottomDock, animatedDockStyle]}
        pointerEvents={isMinimized ? "auto" : "none"}
      >
        <IconButton
          icon="+"
          onPress={() => {}}
          size={24}
          style={styles.dockButton}
          color={colors.textPrimary}
        />
        <View style={styles.nodeInfoPill}>
          <Text style={styles.nodeInfoTitle} numberOfLines={1}>
            {activeNode.name}
          </Text>
          <Text style={styles.nodeInfoSubTitle} numberOfLines={1}>
            {chatCount} chats, {onlineCount} online
          </Text>
        </View>
        <IconButton
          icon="···"
          onPress={() => {}}
          size={22}
          style={styles.dockButton}
          color={colors.textPrimary}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  minimizedListContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    alignItems: "center",
  },
  expandedListContent: {
    paddingVertical: 0,
  },
  minimizedItem: {
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.78,
  },
  expandedItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  itemGap: {
    width: spacing.lg,
  },
  bottomDock: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    bottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  dockButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceLight,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  nodeInfoPill: {
    flex: 1,
    backgroundColor: colors.surfaceLight,
    borderRadius: 22,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  nodeInfoTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontWeight: "600",
  },
  nodeInfoSubTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    marginTop: 2,
  },
});
