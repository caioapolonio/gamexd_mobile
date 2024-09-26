import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
} from "react-native";
import GameCard from "../components/GameCard";
import FormField from "../components/FormField";
import { useRouter } from 'expo-router';

const Search = () => {
  const [recentGames, setRecentGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

 
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const searchGames = async (query) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/games/search-game/${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log('Games', result);
      setRecentGames(result);
    } catch (error) {
      console.error('Erro ao recuperar dados:', error);
    }
  };


  useEffect(() => {
    if (debouncedQuery) {
      searchGames(debouncedQuery);
    }
  }, [debouncedQuery]);

  const fetchRecentGames = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/games/recent-games");
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
    <SafeAreaView className="h-full w-full">
      <View className="bg-[#171524] h-full pt-16 pb-10 w-full">
        <View className="pb-6 px-5">
          <FormField 
            placeholder="Pesquise seu jogo..." 
            rightIcon={"search"} 
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)} // Atualiza a query ao digitar
          />
        </View>
        <View className="pb-6 px-5">
          <Text className="text-white text-lg pb-1">Resultados</Text>
          <View className="h-0.5 w-full bg-white"></View>
        </View>

        <View className="flex px-4 justify-between w-full">
          <FlatList
            data={recentGames}
            renderItem={({ item }) => (
              <View className="p-2">
                <GameCard
                  key={item.id}
                  title={item.name}
                  src={item.header_image}
                  card={false}
                  onPress={() => router.push(`../game/${item.id}`)}
                />
              </View>
            )}
            numColumns={2}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
