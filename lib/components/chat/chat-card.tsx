'use no memo'

import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";
import { ChatHeader, InputBar, MessageBubble } from "../ui";
import { useChatContext } from "../../context";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../../utils";
import type { Chat, Message } from "../../types";

interface ChatCardProps {
  chat: Chat;
  onChatsPress: () => void;
}

export default function ChatCard({ chat, onChatsPress }: ChatCardProps) {
  const { messages, sendMessage } = useChatContext();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState("");
  const chatMessages = messages[chat.id] || [];

  const handleSend = useCallback(() => {
    sendMessage(chat.id, inputText.trim());
    setInputText("");
  }, [chat.id, inputText, sendMessage]);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  }, []);

  return (
    <View style={styles.container}>
      <ChatHeader
        mode="chat"
        name={chat.name}
        online={chat.online}
        onBack={onChatsPress}
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
      <View style={[styles.inputArea, { paddingBottom: insets.bottom || 8 }]}>
        <InputBar value={inputText} onChangeText={setInputText} onSend={handleSend} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "#111111",
  },
  messagesArea: {
    flex: 1,
    backgroundColor: "#111111",
  },
  listContent: {
    paddingVertical: 8,
  },
  inputArea: {
    backgroundColor: "#222222",
  },
});
