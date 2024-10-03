import React from "react";
import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { supabase } from "../../db/supabase";
import GameCard from "../components/GameCard";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const Profile = () => {
  const { session, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const router = useRouter();

  const handleUser = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    setUser(data);
    setLoading(false);
  };

  const handleFavorites = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/favorites/${session.user.id}`
      );
      const result = await response.json();
      setUserFavorites(result);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const handleUserReviews = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/reviews/user-reviews/${session.user.id}`
      );
      const result = await response.json();
      setUserReviews(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    handleUser();
    handleFavorites();
    handleUserReviews();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView 
        className="bg-[#171524] h-full pt-16"
        contentContainerStyle={{ paddingBottom: 100 }} // Adiciona padding na parte inferior
      >
        {/* Header do Usuário */}
        <View className="pb-6 px-5 flex flex-row gap-6 w-full justify-between">
          <View className="flex flex-row gap-6">
            <Image
              className="w-20 h-20 rounded-full border-2 border-[#D8ABF4]"
              source={{ uri: user.avatar_url }}
            />
            <View>
              <Text className="text-white text-2xl">{user.username}</Text>
              <Text className="text-white text-base">
                {userFavorites.length} Jogos Favoritos
              </Text>
              <Text className="text-white text-base">
                {userReviews.length} Análises
              </Text>
            </View>
          </View>
          <CustomButton
            containerStyles="rounded-2xl text-white border border-white w-20 h-12 flex items-center justify-center"
            handlePress={signOut}
          >
            <Feather name="log-out" size={24} color="white" />
          </CustomButton>
        </View>

        {/* Jogos Favoritos */}
        <View className="pb-6 px-5">
          <Text className="text-white text-lg pb-1">Jogos Favoritos</Text>
          <View className="h-0.5 w-full bg-white" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 h-64"
        >
          <View className="flex flex-row gap-4 px-4">
            {userFavorites.map((item) => (
              <GameCard
                key={item.game_id}
                title={item.Games.name}
                src={item.Games.header_image}
                onPress={() => router.push(`../game/${item.game_id}`)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Últimas Avaliações */}
        <View className="pb-6 px-5">
          <Text className="text-white text-lg pb-1">Últimas avaliações</Text>
          <View className="h-0.5 w-full bg-white" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row gap-4 px-4">
            {userReviews.map((item) => (
              <GameCard
                key={item.game_id}
                title={item.Games.name}
                src={item.Games.header_image}
                onPress={() => router.push(`../game/${item.game_id}`)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Outros */}
        <View className="pb-6 px-5 mt-6">
          <Text className="text-white text-lg pb-1">Outros</Text>
          <View className="h-0.5 w-full bg-white mb-4" />
          <Text className="text-white text-lg">Todos os jogos</Text>
          <Text className="text-white text-lg">Listas</Text>
          <Text className="text-white text-lg">Fóruns</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;