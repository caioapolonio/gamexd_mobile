import { Stack } from "expo-router";
import { Text, View } from "react-native";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
