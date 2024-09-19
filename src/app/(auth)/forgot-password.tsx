import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../../db/supabase"; // Import supabase client
import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State to handle email input
  const [loading, setLoading] = useState(false); // State to handle loading

  // Function to handle password reset
  const handlePasswordReset = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    setLoading(false);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      Alert.alert(
        "Sucesso",
        "Se o e-mail estiver registrado, um link de redefinição de senha será enviado."
      );
    }
  };

  return (
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center pt-48 h-full flex flex-col gap-6 px-7">
          <View className="w-full flex gap-6">
            <Text className="text-white font-base text-3xl">
              Esqueceu a senha?
            </Text>
            <Text className="text-white italic text-base">
              Por favor, coloque seu endereço de e-mail para solicitar uma nova
              senha
            </Text>
            <FormField
              placeholder="Email"
              leftIcon={"mail"}
              value={email}
              onChangeText={(text) => setEmail(text)} // Update email state
            />

            <CustomButton
              title={loading ? "Enviando..." : "Enviar"}
              handlePress={handlePasswordReset} // Trigger the password reset logic
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl"
              textStyles="text-white text-2xl uppercase font-normal"
              disabled={loading || !email}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;