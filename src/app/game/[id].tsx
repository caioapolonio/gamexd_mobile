import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomButton from "../components/CustomButton";
import { useAuth } from "@/src/hooks/AuthContext";
import StarRating from "react-native-star-rating-widget";

const GameDetails = () => {
  const navigation = useNavigation();
  const { session } = useAuth();
  const { id } = useLocalSearchParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [userReview, setUserReview] = useState({});

  const fetchGameDetails = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/games/${id}`);
      const result = await response.json();
      setGameDetails(result);
      const activePlatforms = Object.entries(result.platforms)
        .filter(([key, value]) => value)
        .map(([key]) => key);

      setPlatforms(activePlatforms);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar os detalhes do jogo:", error);
    }
  };

  async function fetchReviews() {
    try {
      const response = await fetch(`http://10.0.2.2:3000/reviews/${id}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("All Reviews", result);
      setReviews(result);
      if (result.length > 0) {
        const totalRatingResult = result.reduce(
          (sum, review) => sum + review.star_rating,
          0
        );
        setTotalRating(totalRatingResult);
        setAverageRating(totalRatingResult / result.length);
      } else {
        setAverageRating("Sem avaliações");
      }
      console.log("Average Rating:", averageRating);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  }

  const handleReview = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/reviews/send-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          user_id: session.user.id,
          review_body: reviewText,
          star_rating: starRating,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao avaliar");
      }

      fetchReviews();
      setReviewText("");
      setModalVisible(false);
      setAlreadyReviewed(true);
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/favorites/check-favorite/${session.user.id}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      if (result.length > 0) {
        setFavorite(true);
      }
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/favorites/send-favorite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            user_id: session.user.id,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao favoritar");
      }

      setFavorite(true);
    } catch (error) {
      console.error("Erro ao enviar favorito:", error);
    }
  };

  const handleUnfavorite = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/favorites/delete-favorite/${id}/${session.user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const result = await response.json();
      console.log("Unfavorite", result);
      setFavorite(false);
    } catch (error) {
      console.error("Erro ao recuperar dados de favorito:", error);
    }
  };

  async function userAlreadyReviewed() {
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/reviews/check-user-review/${session.user.id}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("User review", result[0]);

      if (result.length > 0) {
        setStarRating(result[0].star_rating);
        setAlreadyReviewed(true);
        setUserReview(result[0]);
        setReviewText(result[0].review_body);

        return true;
      }
      console.log("User already reviewed ?", alreadyReviewed);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  }

  const updateReview = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:3000/reviews/update-review",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            user_id: session.user.id,
            review_body: reviewText,
            star_rating: starRating,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao avaliar");
      }
      setModalVisible(false);
      setAlreadyReviewed(true);

      fetchReviews();
      userAlreadyReviewed();
      setReviewText(userReview.review_body);
      console.log("Usuario editou a avaliação");
    } catch (error) {
      console.error("Error updating game:", error);
    }
    console.log("userReview.review_body", userReview.review_body);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: gameDetails?.name ? gameDetails.name : "Loading...",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#171524",
      },
    });
  }, [navigation, gameDetails]);

  useEffect(() => {
    fetchGameDetails();
    fetchReviews();
    userAlreadyReviewed();
    checkFavorite();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#980d42"
        className="h-full bg-[#171524]"
      />
    );
  }

  return (
    <View className="h-full flex flex-col flex-1">
      <ScrollView className="bg-[#171524] h-full w-full flex-1">
        <View className="flex-1">
          <View className="flex flex-row justify-between p-4">
            <View className="flex flex-col bg-[#373545] w-[35%] rounded-lg gap-1 pt-3 ">
              <View className="flex flex-row gap-5 justify-center">
                <View className="flex flex-row gap-1 items-center justify-center">
                  <FontAwesome name="star" size={18} color="green" />
                  <Text className="text-white">{totalRating}</Text>
                </View>
                <View className="flex flex-row gap-1 items-center justify-center">
                  <FontAwesome name="pencil" size={18} color="pink" />
                  <Text className="text-white">{reviews.length}</Text>
                </View>
              </View>
              <View className="p-2">
                <Text className="text-white">Média</Text>
                <View className="h-0.5 w-full bg-white"></View>
                <Text className="text-white">{averageRating}</Text>
              </View>
              <View className="p-2">
                <Text className="text-white">Plataformas</Text>
                <View className="h-0.5 w-full bg-white"></View>
                <View className="pt-2 gap-2">
                  {platforms?.map((item) => (
                    <View
                      className="rounded-full text-sm border border-neutral-50 text-neutral-50 inline-flex items-center"
                      key={item}
                    >
                      <Text className="text-white">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View className="p-2">
                <Text className="text-white">Lojas</Text>
                <View className="h-0.5 w-full bg-white"></View>
              </View>
            </View>
            <View className="w-[60%] relative">
              <Image
                source={{ uri: gameDetails?.header_image }}
                className="h-80 rounded-lg"
              />
              <Pressable
                className="absolute top-4 right-4"
                onPress={favorite ? handleUnfavorite : handleFavorite}
              >
                {favorite ? (
                  <View className="flex flex-row relative px-3 pt-3 pb-2  items-center justify-center bg-black/30 rounded-full">
                    <FontAwesome name="heart" size={32} color="pink" />
                  </View>
                ) : (
                  <View className="flex flex-row relative px-3 pt-3 pb-2  items-center justify-center bg-black/30 rounded-full">
                    <FontAwesome name="heart-o" size={32} color="white" />
                  </View>
                )}
              </Pressable>
            </View>
          </View>

          <Text className="text-white px-4">
            {gameDetails?.short_description}
          </Text>
          <Text className="text-white px-4">
            {gameDetails?.publishers} • {gameDetails?.release_date}
          </Text>
          <View className="flex flex-col p-4 mb-8">
            <Text className="text-white text-lg">Avaliações</Text>
            <View className="h-0.5 w-full bg-white"></View>
            <ScrollView className=" w-full pt-4">
              <View className="flex flex-col px-4 gap-10">
                {reviews.map((item) => (
                  <View key={item.id} className="flex flex-row justify-between">
                    <View className="flex flex-row gap-6">
                      <Image
                        className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                        source={{ uri: item.profiles.avatar_url }}
                      />
                      <View>
                        <Text className="text-white text-lg">
                          {item.profiles.username}
                        </Text>
                        <Text
                          className="text-white text-base w-56"
                          numberOfLines={5}
                        >
                          {item.review_body}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <View className="flex-1 justify-center items-center bg-black/50 ">
            <View className="bg-zinc-800 rounded-lg p-6 w-80">
              <View className="flex flex-row justify-between">
                {alreadyReviewed ? (
                  <Text className="text-lg mb-4 text-white">Reavaliar</Text>
                ) : (
                  <Text className="text-lg mb-4 text-white">Avaliar</Text>
                )}
                <FontAwesome
                  name="close"
                  size={24}
                  color="white"
                  onPress={() => setModalVisible(false)}
                />
              </View>

              <View className="items-center pb-6">
                {alreadyReviewed ? (
                  <Text className="text-lg mb-4 text-white">
                    Como você reavalia esse jogo?
                  </Text>
                ) : (
                  <Text className="text-lg mb-4 text-white">
                    Como você avalia esse jogo?
                  </Text>
                )}
                <StarRating
                  rating={starRating}
                  onChange={setStarRating}
                  maxStars={5}
                  enableHalfStar={false}
                />
              </View>
              <TextInput
                placeholder="Escreva um comentário (opcional)"
                placeholderClassName="text-zinc-500"
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="border border-gray-700 mb-4 p-2 text-white rounded-md bg-black/20"
              />
              <CustomButton
                title={alreadyReviewed ? "Reavaliar" : "Avaliar"}
                containerStyles="w-full bg-[#AB72CE] rounded-2xl"
                textStyles={"text-white text-lg"}
                handlePress={alreadyReviewed ? updateReview : handleReview}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>

      {alreadyReviewed ? (
        <Pressable
          className="absolute bottom-6 right-6 flex flex-row gap-2 p-3 items-center justify-center border-2 border-pink-300 rounded-xl"
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="pencil" size={34} color="pink" />
        </Pressable>
      ) : (
        <Pressable
          className="absolute bottom-6 right-6 flex flex-row gap-2 p-3 items-center justify-center border-2 border-green-500 rounded-xl"
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="star" size={34} color="green" />
        </Pressable>
      )}
    </View>
  );
};

export default GameDetails;