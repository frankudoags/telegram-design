import { useCallback, useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { ChatHeader, SearchBar } from "../ui";
import { useChatContext } from "../../context";
import { colors, SCREEN_WIDTH } from "../../utils";
import NodeChatList from "./node-chat-list";

export default function ChatListScreen() {
  const { nodes, chats, activeNodeId, activeTab, setActiveTab, setActiveNode } = useChatContext();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const index = nodes.findIndex((n) => n.id === activeNodeId);
    if (index >= 0) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  }, [activeNodeId, nodes]);

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      setActiveNode(nodeId);
    },
    [setActiveNode]
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
    [nodes, activeNodeId, setActiveNode]
  );

  const handleChatPress = useCallback(
    (chatId: string) => {
      router.push(`/chat/${chatId}`);
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: typeof nodes[number] }) => (
      <View style={styles.page}>
        <SearchBar />
        <NodeChatList
          node={item}
          chats={chats}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          onChatPress={handleChatPress}
        />
      </View>
    ),
    [chats, activeTab, setActiveTab, handleChatPress]
  );

  return (
    <View style={styles.container}>
      <ChatHeader
        mode="list"
        name={activeNode.name}
        nodeEmoji={activeNode.emoji}
        onBack={() => {}}
        activeNodeId={activeNodeId}
        nodes={nodes}
        onNodeSelect={handleNodeSelect}
      />
      <FlatList
        ref={flatListRef}
        data={nodes}
        keyExtractor={(n) => n.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    width: SCREEN_WIDTH,
    flex: 1,
  },
});
