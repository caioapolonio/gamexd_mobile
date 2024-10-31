import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext";
import { supabase } from "../../db/supabase";
import GameCard from "../components/GameCard";
import CustomButton from "../components/CustomButton";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { StarRatingDisplay } from "react-native-star-rating-widget";

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
  }, [userFavorites]);

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        className="bg-[#171524] h-full pt-16"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
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
        <View className="pb-6 px-5">
          <Text className="text-white text-lg pb-1">Últimas avaliações</Text>
          <View className="h-0.5 w-full bg-white" />
        </View>
        <ScrollView className="mb-8">
          <View className="flex flex-col px-4 gap-10">
            {userReviews.map((item) => (
              <View key={item.id} className="flex flex-row justify-between ">
                <View className="flex flex-row gap-6">
                  <Image
                    className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                    source={{ uri: user.avatar_url }}
                  />
                  <View className="">
                    <Text className="text-white text-lg">{user.username}</Text>
                    <View className="flex flex-row items-center ">
                      <StarRatingDisplay
                        rating={item.star_rating}
                        color="#64C25C"
                        emptyColor="#2c2847"
                        starSize={20}
                        style={styles.starRating}
                        starStyle={styles.star}
                      />
                    </View>
                    <View className="w-28">
                      <Text className="text-white text-base">
                        {item.review_body}
                      </Text>
                    </View>
                  </View>
                </View>
                <GameCard
                  key={item.game_id}
                  title={item.Games.name}
                  src={item.Games.header_image}
                  card={true}
                  onPress={() => router.push(`../game/${item.game_id}`)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  starRating: {},
  star: {
    marginHorizontal: 0,
  },
});

export default Profile;
