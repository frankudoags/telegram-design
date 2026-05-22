import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { LegendList } from "@legendapp/list";
import { ChatHeader, InputBar, MessageBubble } from "../ui";
import { useChatContext } from "../../context";
import { spacing, colors } from "../../utils";
import type { Message } from "../../types";

interface ChatViewScreenProps {
  onBack: () => void;
  onNodeNamePress: () => void;
}

export default function ChatViewScreen({ onBack, onNodeNamePress }: ChatViewScreenProps) {
  const { chats, messages, sendMessage, nodes, activeNodeId, activeChatId } = useChatContext();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState("");

  const chat = activeChatId ? chats[activeChatId] : null;
  const activeNode = nodes.find((n) => n.id === activeNodeId) || nodes[0];
  const chatMessages = activeChatId ? (messages[activeChatId] || []) : [];

  const handleSend = useCallback(() => {
    if (!activeChatId || !inputText.trim()) return;
    sendMessage(activeChatId, inputText.trim());
    setInputText("");
  }, [activeChatId, inputText, sendMessage]);

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
          nodeName={activeNode.name}
          nodeEmoji={activeNode.emoji}
          onBack={onBack}
          onNodeNamePress={onNodeNamePress}
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
        <View style={[styles.inputArea, { paddingBottom: insets.bottom || spacing.sm }]}>
          <InputBar value={inputText} onChangeText={setInputText} onSend={handleSend} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  inputArea: {
    backgroundColor: colors.surfaceLight,
  },
});
