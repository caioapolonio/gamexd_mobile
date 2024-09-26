import { useState } from "react";
import { Link, router } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View, Alert } from "react-native";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { supabase } from "../../db/supabase";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert("Erro", error.message);
    } else {
      router.replace("/home");
    }
  };

  return (
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center pt-10 h-full px-4 flex flex-col gap-6">
          <View className="mb-8">
            <Image source={require("../../../assets/images/gamexdlogo.png")} />
          </View>
          <View className="w-full flex gap-6">
            <Text className="text-white font-base text-3xl">Entrar</Text>
            <FormField placeholder="Email" leftIcon={"mail"} onChangeText={setEmail} value={email} />
            <FormField placeholder="Senha" leftIcon={"lock"} onChangeText={setPassword} value={password} />
            <View className="flex flex-row w-full justify-end">
              <Link href="/forgot-password" className="text-white">
                Esqueceu a senha?
              </Link>
            </View>
            <CustomButton
              title={loading ? "Carregando..." : "Entrar"}
              handlePress={handleSignIn}
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl "
              textStyles="text-white text-2xl uppercase font-normal"
              isLoading={loading}
            />
          </View>

          <View>
            <Text className="text-white text-lg italic">
              Não possui uma conta?
              <Link href="/sign-up" className="text-[#AB72CE]">
                {" "}
                Crie aqui!
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
