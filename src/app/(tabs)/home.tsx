import React from "react";
import { View, ScrollView, SafeAreaView, Text } from "react-native";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { useRouter } from "expo-router"; // Importar o hook de navegação

const Home = () => {
  const [recentGames, setRecentGames] = useState([]);
  const router = useRouter();

  const fetchRecentGames = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/games/recent-games`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setRecentGames(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchRecentGames();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="bg-[#171524] h-full pt-16">
        <View className="pb-6 px-5">
          <Text className="text-white text-lg">Jogos Populares</Text>
          <View className="h-0.5 w-full bg-white"></View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 h-64"
        >
          <View className="flex flex-row gap-4 px-4">
            {recentGames.map((item) => (
              <GameCard
                key={item.id}
                title={item.name}
                src={item.header_image}
                card={false}
                onPress={() => router.push(`../game/${item.id}`)} // Navegar para a tela de detalhes
              />
            ))}
          </View>
        </ScrollView>
        <View className="pb-6 px-5">
          <Text className="text-white text-lg">Adicionados Recentemente</Text>
          <View className="h-0.5 w-full bg-white"></View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex flex-row gap-4 px-4">
            {recentGames.map((item) => (
              <GameCard
                key={item.id}
                title={item.name}
                src={item.header_image}
                card={false}
                onPress={() => router.push(`../game/${item.id}`)} // Navegar para a tela de detalhes
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
