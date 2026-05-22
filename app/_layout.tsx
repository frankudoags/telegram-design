import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function App() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="chat/[chatId]" options={{ headerShown: false }} />
      </Stack>
    </KeyboardProvider>
  );
}
