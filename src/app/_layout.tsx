import { Stack } from "expo-router";
import "../styles/global.css";
import { AuthProvider } from "../hooks/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="game/[id]" />
      </Stack>
    </AuthProvider>
  );
}
