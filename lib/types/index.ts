export interface ChatNode {
  id: string;
  name: string;
  emoji: string;
  color: string;
  chatIds: string[];
  tabs: string[];
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  unreadCount: number;
  online: boolean;
  lastMessageTime: number;
  muted: boolean;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  senderId: "me" | "them";
}

