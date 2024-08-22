import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const SignIn = () => {
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
            <FormField placeholder="Email" leftIcon={"mail"} />
            <FormField placeholder="Senha" leftIcon={"lock"} />
            <View className="flex flex-row w-full justify-end">
              <Text className="text-white">Esqueceu a senha?</Text>
            </View>
            <CustomButton
              title="Entrar"
              handlePress={() => {}}
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl "
              textStyles="text-white text-2xl uppercase font-normal"
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
