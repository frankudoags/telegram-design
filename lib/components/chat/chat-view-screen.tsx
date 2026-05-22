import { LegendList } from "@legendapp/list";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useChatContext } from "../../context";
import type { Message } from "../../types";
import { colors, spacing } from "../../utils";
import { ChatHeader, InputBar, MessageBubble } from "../ui";

export default function ChatViewScreen() {
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const router = useRouter();
  const { chats, messages, sendMessage, nodes, activeNodeId } =
    useChatContext();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState("");

  const chat = chatId ? chats[chatId] : null;
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const chatMessages = chatId ? messages[chatId] || [] : [];

  const handleSend = useCallback(() => {
    if (!chatId || !inputText.trim()) return;
    sendMessage(chatId, inputText.trim());
    setInputText("");
  }, [chatId, inputText, sendMessage]);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  }, []);

  if (!chat) return null;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior="padding">
      <View style={styles.container}>
        <ChatHeader
          mode="chat"
          name={chat.name}
          online={chat.online}
          nodeEmoji={activeNode.emoji}
          onBack={() => router.back()}
        />
        <View style={styles.messagesArea}>
          <LegendList
            data={chatMessages}
            keyExtractor={(m) => m.id}
            renderItem={renderItem}
            estimatedItemSize={60}
            alignItemsAtEnd
            maintainScrollAtEnd
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View
          style={[
            styles.inputArea,
            { paddingBottom: insets.bottom || spacing.sm },
          ]}
        >
          <InputBar
            value={inputText}
            onChangeText={setInputText}
            onSend={handleSend}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.surfaceMid,
  },
  messagesArea: {
    flex: 1,
    backgroundColor: colors.surfaceMid,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  inputArea: {
    backgroundColor: colors.surfaceLight,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
