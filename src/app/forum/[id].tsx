import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { IoSend } from "react-icons/io5";
import CustomButton from "../components/CustomButton";
import { useLocalSearchParams, useNavigation } from "expo-router";

const ForumInfo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  //   const { session } = useAuth();
  const [forum, setForum] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleForum = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http:///10.0.2.2:3000/forums/forum/${id}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setForum(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/forums/forum/${id}/comments`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.error("Erro ao recuperar dados dos comentários:", error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fórum",
      headerTintColor: "#FFFFFF",
      headerStyle: {
        backgroundColor: "#171524",
      },
    });
  }, [navigation]);

  useEffect(() => {
    handleForum();
    handleComments();
  }, []);

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
    <View className="flex-1">
      <ScrollView className="flex-1 px-5 bg-[#171524] ">
        <View>
          <View className="border-b border-white pb-2">
            <Text className="text-2xl font-medium text-white">
              {forum.title}
            </Text>
          </View>
          <View className="flex flex-row border-[0.5px] border-white rounded-md mt-3 ">
            <View className="border-r border-white flex items-center w-20 p-2 gap-2">
              <Image
                className="w-14 h-14 rounded-full border-2 border-[#D8ABF4]"
                source={{ uri: forum?.profiles?.avatar_url }}
              />
              <Text className="text-white">{forum?.profiles?.username}</Text>
            </View>

            <View className="flex-1 p-3 bg-[#2a273b] rounded-r-md">
              <Text className="text-xs text-white">
                {formatDate(forum.created_at)}
              </Text>
              <Text className="text-white">{forum?.description}</Text>
            </View>
          </View>

          <Text className="font-medium mt-4 text-white mb-4">Comentários</Text>

          {comments.length === 0 && (
            <Text className="text-white mb-4">
              Nenhum comentário disponível
            </Text>
          )}

          <View className="flex flex-col gap-3">
            {comments.map((item) => (
              <View
                key={item.id}
                className="border-[0.5px] border-white/20 p-2 rounded-md "
              >
                <View className="flex flex-row">
                  <View className="flex flex-col gap-2 items-center">
                    <Image
                      className="w-11 h-11 rounded-full border-2 border-[#D8ABF4]"
                      source={{ uri: item?.profiles?.avatar_url }}
                    />
                    <Text className="text-white text-sm">
                      {item?.profiles?.username}
                    </Text>
                  </View>

                  <View className="flex-1 ml-4 ">
                    <Text className="text-xs text-white">
                      {formatDate(item?.created_at)}
                    </Text>
                    <Text className="text-white">{item?.comment}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ForumInfo;
