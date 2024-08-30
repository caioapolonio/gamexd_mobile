import { Link } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const ForgotPassword = () => {
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
            <FormField placeholder="Email" leftIcon={"mail"} />

            <CustomButton
              title="Enviar"
              handlePress={() => {}}
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl "
              textStyles="text-white text-2xl uppercase font-normal"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
