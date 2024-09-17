import React from "react";
import { View, ScrollView, SafeAreaView, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { supabase } from "../../db/supabase";
import GameCard from "../components/GameCard";
import StarRating from "../components/StarRating";

const Profile = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [userFavorites, setUserFavorites] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  const handleUser = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    console.log("DATA", data);
    console.log("SESSION", session);
    setUser(data);
    setLoading(false);
  };

  const handleFavorites = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/favorites/${session.user.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserFavorites(result);
      console.log("User favorites", result);
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  };

  const handleUserReviews = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/reviews/user-reviews/${session.user.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setUserReviews(result);
      console.log("user review", result);
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
    <SafeAreaView className="h-full w-full">
      <ScrollView className="bg-[#171524] h-full pt-16">
        <View className="pb-6 px-5 flex flex-row gap-6">
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
        <View className="pb-6 px-5">
          <Text className="text-white text-lg pb-1">Jogos Favoritos</Text>
          <View className="h-0.5 w-full bg-white"></View>
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
                card={false}
              />
            ))}
          </View>
        </ScrollView>
        <View className="pb-6 px-5">
          <Text className="text-white text-lg">Adicionados Recentemente</Text>
          <View className="h-0.5 w-full bg-white"></View>
        </View>
        <ScrollView className="h-64 w-full">
          <View className="flex flex-col px-4 gap-10">
            {userReviews.map((item) => (
              <View key={item.id} className="flex flex-row justify-between">
                <View className="flex flex-row gap-6">
                  <Image
                    className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                    source={{ uri: user.avatar_url }}
                  />
                  <View>
                    <Text className="text-white text-lg">{user.username}</Text>
                    <Text
                      className="text-white text-base w-36"
                      numberOfLines={5}
                    >
                      {item.review_body}
                    </Text>
                  </View>
                </View>
                <GameCard
                  key={item.game_id}
                  title={item.Games.name}
                  src={item.Games.header_image}
                  card={true}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
