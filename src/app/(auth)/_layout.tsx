import { Stack } from "expo-router";
import { Text, View } from "react-native";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerStyle: { backgroundColor: "#171524" },
          title: "Entrar",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerStyle: { backgroundColor: "#171524" },
          title: "Cadastro",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerStyle: { backgroundColor: "#171524" },
          title: "Esqueci a senha",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
