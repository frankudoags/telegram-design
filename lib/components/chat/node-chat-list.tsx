import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ChatListItem, TabBar } from "../ui";
import { spacing, colors } from "../../utils";
import type { ChatNode, Chat } from "../../types";

interface NodeChatListProps {
  node: ChatNode;
  chats: Record<string, Chat>;
  activeTab: string;
  onTabPress: (tab: string) => void;
  onChatPress: (chatId: string) => void;
}

export default function NodeChatList({
  node,
  chats,
  activeTab,
  onTabPress,
  onChatPress,
}: NodeChatListProps) {
  const nodeChats = node.chatIds
    .map((id) => chats[id])
    .filter(Boolean)
    .sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  const renderItem = useCallback(
    ({ item }: { item: Chat }) => (
      <ChatListItem chat={item} onPress={onChatPress} />
    ),
    [onChatPress]
  );

  return (
    <View style={styles.container}>
      <TabBar
        tabs={node.tabs}
        activeTab={activeTab}
        onTabPress={onTabPress}
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
