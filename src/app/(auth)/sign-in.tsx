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
        <View className="w-full items-center pt-10 h-full px-4 flex flex-col gap-4">
          <Link href="/home">go to home</Link>
          <View>
            <Image source={require("../../../assets/images/gamexdlogo.png")} />
          </View>

          <FormField placeholder="Email" leftIcon={"mail"} />
          <FormField placeholder="Senha" leftIcon={"lock"} />
          <CustomButton
            title="Entrar"
            handlePress={() => {}}
            containerStyles="w-full mt-7"
          />

          <View>
            <Text className="text-white text-lg">Não possui uma conta?</Text>
            <Link href="/sign-up">Crie aqui!</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
