'use no memo'

import { useCallback, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ChatListScreen from "../chat/chat-list-screen";
import ChatViewScreen from "../chat/chat-view-screen";
import { NodeSwitcher } from "../node";
import { useChatContext } from "../../context";
import { SCREEN_WIDTH } from "../../utils";

const ANIM_DURATION = 300;
const ANIM_CONFIG = { duration: ANIM_DURATION };

export default function CardContainer() {
  const { appState, setAppState, setActiveNode, closeChat, openChat } = useChatContext();

  // Shared values — animations run entirely on UI thread
  const nodeSwitcherProgress = useSharedValue(0);
  const chatViewProgress = useSharedValue(0);

  // Sync shared values with appState changes
  useEffect(() => {
    if (appState === "nodeSwitcher") {
      nodeSwitcherProgress.value = withTiming(1, ANIM_CONFIG);
    } else {
      nodeSwitcherProgress.value = withTiming(0, ANIM_CONFIG);
    }
  }, [appState]);

  useEffect(() => {
    if (appState === "chatView") {
      chatViewProgress.value = withTiming(1, ANIM_CONFIG);
    } else {
      chatViewProgress.value = withTiming(0, ANIM_CONFIG);
    }
  }, [appState]);

  // Handlers — triggered by Pressable.onPress (JS thread)
  const handleNodeNamePress = useCallback(() => {
    setAppState("nodeSwitcher");
  }, [setAppState]);

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      setActiveNode(nodeId);
      setAppState("chatList");
    },
    [setActiveNode, setAppState]
  );

  const handleNodeSwitcherClose = useCallback(() => {
    setAppState("chatList");
  }, [setAppState]);

  const handleChatPress = useCallback(
    (chatId: string) => {
      openChat(chatId);
    },
    [openChat]
  );

  const handleChatBack = useCallback(() => {
    closeChat();
  }, [closeChat]);

  // Animated styles — computed on UI thread
  const chatListAnimStyle = useAnimatedStyle(() => {
    const p = nodeSwitcherProgress.value;
    return {
      opacity: 1 - p,
      transform: [{ scale: 1 - p * 0.05 }],
      pointerEvents: p > 0.5 ? ("none" as const) : ("auto" as const),
    };
  });

  const chatViewAnimStyle = useAnimatedStyle(() => {
    const p = chatViewProgress.value;
    return {
      transform: [{ translateX: (1 - p) * SCREEN_WIDTH }],
    };
  });

  const nodeSwitcherAnimStyle = useAnimatedStyle(() => {
    const p = nodeSwitcherProgress.value;
    return {
      opacity: p,
      transform: [{ translateY: (1 - p) * -80 }],
      pointerEvents: p > 0.5 ? ("auto" as const) : ("none" as const),
    };
  });

  return (
    <View style={styles.root}>
      {/* Layer 0: Chat List (fades when node switcher opens) */}
      <Animated.View style={[StyleSheet.absoluteFill, chatListAnimStyle]}>
        <ChatListScreen
          onNodeNamePress={handleNodeNamePress}
          onChatPress={handleChatPress}
        />
      </Animated.View>

      {/* Layer 1: Chat View (slides from right) */}
      {appState === "chatView" && (
        <Animated.View style={[StyleSheet.absoluteFill, chatViewAnimStyle]}>
          <ChatViewScreen
            onBack={handleChatBack}
            onNodeNamePress={handleNodeNamePress}
          />
        </Animated.View>
      )}

      {/* Layer 2: Node Switcher Overlay */}
      <Animated.View style={[StyleSheet.absoluteFill, nodeSwitcherAnimStyle]}>
        <NodeSwitcher
          onSelectNode={handleNodeSelect}
          onClose={handleNodeSwitcherClose}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
