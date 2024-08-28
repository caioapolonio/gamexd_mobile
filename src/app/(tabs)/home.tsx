import React from "react";
import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const Home = () => {
  const [recentGames, setRecentGames] = useState([]);

  const fetchRecentGames = async () => {
    try {
      const response = await fetch(
        `http://10.50.31.113:3000/games/recent-games`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Games", result);
      setRecentGames(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    fetchRecentGames();
  }, []);

  return (
    <SafeAreaView className="bg-[#171524] h-full">
      <ScrollView className="h-full pt-16">
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
                card={true}
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
                card={true}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
