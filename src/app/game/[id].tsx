import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter, useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomButton from "../components/CustomButton";
import { useAuth } from "@/src/hooks/AuthContext";

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

  // State for modal visibility and input values
  const [modalVisible, setModalVisible] = useState(false);
  const [starRating, setStarRating] = useState("");
  const [reviewText, setReviewText] = useState("");

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
    <ScrollView className="bg-[#171524] h-full w-full">
      <View>
        <View className="flex flex-row justify-between p-4">
          <View className="w-[60%]">
            <Image
              source={{ uri: gameDetails?.header_image }}
              className="h-80 rounded-lg"
            />
          </View>

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
            <View className="flex flex-row justify-between px-6 mt-3">
              <View className="flex flex-row gap-1 items-center justify-center">
                <FontAwesome
                  name="star"
                  size={34}
                  color="green"
                  onPress={() => setModalVisible(true)} // Open the modal on press
                />
              </View>
              <View className="flex flex-row gap-1 items-center justify-center">
                <FontAwesome name="heart" size={32} color="pink" />
              </View>
            </View>
          </View>
        </View>

        <Text className="text-white px-4">
          {gameDetails?.short_description}
        </Text>
        <Text className="text-white px-4">
          {gameDetails?.publishers} • {gameDetails?.release_date}
        </Text>
        <View className="flex flex-col p-4">
          <Text className="text-white text-lg">Avaliações</Text>
          <View className="h-0.5 w-full bg-white"></View>
          <ScrollView className="h-64 w-full pt-4">
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
                        className="text-white text-base w-36"
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

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50 ">
          <View className="bg-zinc-800 rounded-lg p-6 w-80">
            <View className="flex flex-row justify-end">
              <FontAwesome
                name="close"
                size={24}
                color="white"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <Text className="text-lg mb-4 text-white">Avaliar</Text>
            <TextInput
              placeholder="Rating (1-5)"
              placeholderClassName="text-zinc-500"
              value={starRating}
              onChangeText={setStarRating}
              keyboardType="numeric"
              className="border border-gray-300 mb-4 p-2 rounded-md"
            />
            <TextInput
              placeholder="Your Review"
              placeholderClassName="text-zinc-500"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              className="border border-gray-300 mb-4 p-2 text-white rounded-md"
            />
            <CustomButton
              title="Submit"
              containerStyles="w-full bg-[#AB72CE] rounded-2xl"
              textStyles={"text-white text-lg"}
              handlePress={handleReview}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default GameDetails;