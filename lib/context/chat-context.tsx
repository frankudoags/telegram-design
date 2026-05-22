'use no memo'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ChatNode, Chat, Message, AppState } from "../types";

interface ChatState {
  nodes: ChatNode[];
  chats: Record<string, Chat>;
  messages: Record<string, Message[]>;
  activeNodeId: string;
  activeChatId: string | null;
  appState: AppState;
  activeTab: string;
  setActiveNode: (id: string) => void;
  openChat: (chatId: string) => void;
  closeChat: () => void;
  sendMessage: (chatId: string, text: string) => void;
  setAppState: (state: AppState) => void;
  setActiveTab: (tab: string) => void;
}

const ChatContext = createContext<ChatState | null>(null);

export function useChatContext(): ChatState {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

const MOCK_NODES: ChatNode[] = [
  {
    id: "default",
    name: "Chats",
    emoji: "💬",
    color: "#7B68EE",
    chatIds: ["1", "2", "3", "4"],
    tabs: ["All Chats", "Personal", "Groups"],
  },
  {
    id: "marketing",
    name: "Marketing",
    emoji: "📢",
    color: "#FF6B6B",
    chatIds: ["5", "6"],
    tabs: ["All", "Campaigns", "Analytics"],
  },
  {
    id: "design",
    name: "Design",
    emoji: "🎨",
    color: "#4ECDC4",
    chatIds: ["7", "8", "9"],
    tabs: ["All", "Active", "Archived"],
  },
  {
    id: "ai",
    name: "AI",
    emoji: "🤖",
    color: "#45B7D1",
    chatIds: ["10", "11"],
    tabs: ["All", "Bots", "Assistants"],
  },
];

const MOCK_CHATS: Record<string, Chat> = {
  "1": { id: "1", name: "Alice Johnson", avatar: "", lastMessage: "Hey! How are you?", unreadCount: 2, online: true, lastMessageTime: Date.now() - 60000, muted: false },
  "2": { id: "2", name: "Bob Smith", avatar: "", lastMessage: "See you tomorrow!", unreadCount: 0, online: false, lastMessageTime: Date.now() - 7200000, muted: false },
  "3": { id: "3", name: "Design Team", avatar: "", lastMessage: "New mockups uploaded", unreadCount: 5, online: false, lastMessageTime: Date.now() - 1800000, muted: false },
  "4": { id: "4", name: "Sarah Williams", avatar: "", lastMessage: "Got it, thanks!", unreadCount: 1, online: true, lastMessageTime: Date.now() - 900000, muted: true },
  "5": { id: "5", name: "Campaign Bot", avatar: "", lastMessage: "Report ready", unreadCount: 3, online: false, lastMessageTime: Date.now() - 300000, muted: false },
  "6": { id: "6", name: "Social Team", avatar: "", lastMessage: "Post scheduled!", unreadCount: 0, online: false, lastMessageTime: Date.now() - 5400000, muted: false },
  "7": { id: "7", name: "UI Review", avatar: "", lastMessage: "Looks great!", unreadCount: 1, online: false, lastMessageTime: Date.now() - 120000, muted: false },
  "8": { id: "8", name: "Figma Updates", avatar: "", lastMessage: "New components added", unreadCount: 2, online: false, lastMessageTime: Date.now() - 600000, muted: false },
  "9": { id: "9", name: "Brand Guide", avatar: "", lastMessage: "Colors updated", unreadCount: 0, online: false, lastMessageTime: Date.now() - 86400000, muted: false },
  "10": { id: "10", name: "GPT Assistant", avatar: "", lastMessage: "How can I help?", unreadCount: 0, online: true, lastMessageTime: Date.now() - 30000, muted: false },
  "11": { id: "11", name: "Code Helper", avatar: "", lastMessage: "Build successful!", unreadCount: 4, online: false, lastMessageTime: Date.now() - 150000, muted: false },
};

const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", chatId: "1", text: "Hey! How are you?", timestamp: Date.now() - 3600000, senderId: "them" },
    { id: "m2", chatId: "1", text: "I'm good! Working on the app.", timestamp: Date.now() - 3500000, senderId: "me" },
    { id: "m3", chatId: "1", text: "Oh nice! Can I see it?", timestamp: Date.now() - 3400000, senderId: "them" },
    { id: "m4", chatId: "1", text: "Sure, give me a sec", timestamp: Date.now() - 3300000, senderId: "me" },
  ],
  "2": [
    { id: "m5", chatId: "2", text: "Meeting at 3pm?", timestamp: Date.now() - 7200000, senderId: "me" },
    { id: "m6", chatId: "2", text: "See you tomorrow!", timestamp: Date.now() - 7100000, senderId: "them" },
  ],
  "3": [
    { id: "m7", chatId: "3", text: "Check the new designs", timestamp: Date.now() - 1800000, senderId: "them" },
    { id: "m8", chatId: "3", text: "New mockups uploaded", timestamp: Date.now() - 1700000, senderId: "them" },
  ],
  "4": [
    { id: "m9", chatId: "4", text: "Can you send the file?", timestamp: Date.now() - 900000, senderId: "me" },
    { id: "m10", chatId: "4", text: "Got it, thanks!", timestamp: Date.now() - 800000, senderId: "them" },
  ],
  "7": [
    { id: "m11", chatId: "7", text: "Here's the updated mockup", timestamp: Date.now() - 200000, senderId: "me" },
    { id: "m12", chatId: "7", text: "Looks great!", timestamp: Date.now() - 120000, senderId: "them" },
  ],
  "10": [
    { id: "m13", chatId: "10", text: "Hello!", timestamp: Date.now() - 60000, senderId: "me" },
    { id: "m14", chatId: "10", text: "How can I help?", timestamp: Date.now() - 30000, senderId: "them" },
  ],
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [nodes] = useState<ChatNode[]>(MOCK_NODES);
  const [chats] = useState<Record<string, Chat>>(MOCK_CHATS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(MOCK_MESSAGES);
  const [activeNodeId, setActiveNodeId] = useState("default");
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [appState, setAppStateInner] = useState<AppState>("chatList");
  const [activeTab, setActiveTab] = useState("All Chats");

  const setActiveNode = useCallback((id: string) => {
    setActiveNodeId(id);
    setActiveChatId(null);
    const node = MOCK_NODES.find((n) => n.id === id);
    if (node) setActiveTab(node.tabs[0]);
  }, []);

  const openChat = useCallback((chatId: string) => {
    setActiveChatId(chatId);
    setAppStateInner("chatView");
  }, []);

  const closeChat = useCallback(() => {
    setActiveChatId(null);
    setAppStateInner("chatList");
  }, []);

  const setAppState = useCallback((state: AppState) => {
    setAppStateInner(state);
  }, []);

  const sendMessage = useCallback((chatId: string, text: string) => {
    const msg: Message = {
      id: `m_${Date.now()}`,
      chatId,
      text,
      timestamp: Date.now(),
      senderId: "me",
    };
    setMessages((prev) => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), msg],
    }));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        nodes,
        chats,
        messages,
        activeNodeId,
        activeChatId,
        appState,
        activeTab,
        setActiveNode,
        openChat,
        closeChat,
        sendMessage,
        setAppState,
        setActiveTab,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
