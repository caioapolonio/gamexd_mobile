import { router } from "expo-router";
import React from "react";
import { View, Image, Text, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import CustomButton from "./components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const funcionalidades = [
  {
    // titulo: "Avaliação de Jogos",
    // descricao:
    //   "Dê sua opinião sobre jogos e confira as avaliações dos outros jogadores.",
    imagem: require	("../../assets/images/cards/card-gam.jpg"),
  },
  {
    // titulo: "Adicione aos Favoritos",
    // descricao:
    //   "Salve seus jogos favoritos para acessá-los rapidamente a qualquer momento.",
    imagem: require	("../../assets/images/cards/card-fav.jpg"),
  },
  {
    // titulo: "Fórum de Discussões",
    // descricao:
    //   "Participe de discussões sobre os seus jogos favoritos e compartilhe suas ideias.",
    imagem: require  ("../../assets/images/cards/card-for.jpg"),
  },
];

const Index = () => {
  return (
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView className="h-full">
        <View className="w-full justify-center items-center min-h-[85vh] pt-10 px-4 flex flex-col gap-4 mt-14">
          <View>
            <Image source={require("../../assets/images/gamexdlogo.png")} />
          </View>

          <Carousel
            loop
            width={width * 0.85}
            autoPlay={true}
            data={funcionalidades}
            scrollAnimationDuration={1500}
            autoPlayInterval={3000}
            renderItem={({ item }) => (
              <LinearGradient
                colors={["#373545", "#1c1a29"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: 16,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 8,
                  height: 450,
                }}
              >
                <Image source={item.imagem} style={{ width: "100%", height: "100%", borderRadius: 16,}} resizeMode="cover" />
                {/* <Text className="text-lg font-bold text-white text-center">
                  {item.titulo}
                </Text>
                <Text className="text-sm text-gray-200 text-center">
                  {item.descricao}
                </Text> */}
              </LinearGradient>
            )}
          />

          <CustomButton
            title="Continuar"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-[87%] bg-[#AB72CE] rounded-2xl"
            textStyles="text-white text-2xl uppercase font-normal"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
