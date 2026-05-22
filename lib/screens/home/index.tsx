'use no memo'

import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ChatProvider } from "../../context";
import CardContainer from "../../components/home/card-container";

export default function Home() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <ChatProvider>
        <CardContainer />
      </ChatProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
