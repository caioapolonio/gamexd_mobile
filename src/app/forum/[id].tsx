import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "@/src/hooks/AuthContext";

const ForumInfo = () => {
  const { session, signOut } = useAuth();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
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
      const response = await fetch(`http://10.0.2.2:3000/forums/forum/${id}`);
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

  const handleNewComment = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/forums/new-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user.id,
          forum_id: id,
          comment: commentBody,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      handleComments();
      setCommentBody("");
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
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
    <View className="flex-1 bg-[#171524]">
      <ScrollView className="flex-1 px-5  mb-20">
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
                  <View className="flex flex-col gap-2 items-center w-14">
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

      {/* Input and button at the bottom */}
      <View className="absolute bottom-0 left-0 right-0 p-3 bg-[#171524] flex-row items-center gap-2 ">
        <TextInput
          className="flex-1 bg-zinc-700 text-white p-2 rounded-md"
          placeholder="Escreva um comentário"
          value={commentBody}
          onChangeText={setCommentBody}
          maxLength={120}
        />
        <Pressable
          className=" bg-green-600 p-2 rounded-md h-full flex items-center justify-center"
          onPress={handleNewComment}
        >
          <MaterialIcons name="send" size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default ForumInfo;
