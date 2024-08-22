import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const SignUp = () => {
  return (
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center  pt-16 h-full px-4 flex flex-col gap-6">
          <View className="w-full flex gap-6">
            <Text className="text-white font-base text-3xl">Criar conta</Text>
            <FormField placeholder="Nome de usuário" leftIcon={"user"} />
            <FormField placeholder="Email" leftIcon={"mail"} />
            <FormField placeholder="Senha" leftIcon={"lock"} />
            <FormField placeholder="Confirmar senha" leftIcon={"lock"} />

            <CustomButton
              title="Entrar"
              handlePress={() => {}}
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl "
              textStyles="text-white text-2xl uppercase font-normal"
            />
          </View>

          <View>
            <Text className="text-white text-lg italic">
              Já possui uma conta?
              <Link href="/sign-in" className="text-[#AB72CE]">
                {" "}
                Entre aqui!
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
