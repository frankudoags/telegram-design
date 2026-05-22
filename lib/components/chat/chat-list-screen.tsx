import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ChatHeader, ChatListItem, SearchBar, TabBar } from "../ui";
import { useChatContext } from "../../context";
import { colors, spacing } from "../../utils";

interface ChatListScreenProps {
  onNodeNamePress: () => void;
  onChatPress: (chatId: string) => void;
}

export default function ChatListScreen({ onNodeNamePress, onChatPress }: ChatListScreenProps) {
  const { nodes, chats, activeNodeId, activeTab, setActiveTab } = useChatContext();

  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const nodeChats = activeNode.chatIds
    .map((id) => chats[id])
    .filter(Boolean)
    .sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  const renderItem = useCallback(
    ({ item }: { item: { id: string; name: string; avatar: string; lastMessage: string; unreadCount: number; online: boolean; lastMessageTime: number; muted: boolean } }) => (
      <ChatListItem chat={item} onPress={onChatPress} />
    ),
    [onChatPress]
  );

  return (
    <View style={styles.container}>
      <ChatHeader
        mode="list"
        name={activeNode.name}
        nodeName={activeNode.name}
        nodeEmoji={activeNode.emoji}
        onBack={() => {}}
        onNodeNamePress={onNodeNamePress}
      />
      <SearchBar />
      <TabBar
        tabs={activeNode.tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      <FlatList
        data={nodeChats}
        keyExtractor={(c) => c.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
});
