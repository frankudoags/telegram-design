import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function AppContent() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppContent />
    </GestureHandlerRootView>
  )
}