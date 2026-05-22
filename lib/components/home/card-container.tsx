"use no memo";

import { ChatProvider } from "../../context";
import ChatListScreen from "../chat/chat-list-screen";

export default function CardContainer() {
  return (
    <ChatProvider>
      <ChatListScreen />
    </ChatProvider>
  );
}
