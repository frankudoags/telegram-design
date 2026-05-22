import ChatViewScreen from "../../lib/components/chat/chat-view-screen";
import { ChatProvider } from "../../lib/context";

export default function ChatScreen() {
  return (
    <ChatProvider>
      <ChatViewScreen />
    </ChatProvider>
  );
}
