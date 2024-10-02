import React, { useEffect, useState } from "react";
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
import { useLocalSearchParams } from "expo-router";

const ForumInfo = () => {
  const route = useRoute();
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

  //   const handleNewComment = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("http:///10.0.2.2:3000/forums/new-comment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           user_id: session.user.id,
  //           forum_id: id,
  //           comment: commentBody,
  //         }),
  //       });
  //       if (!response.ok) throw new Error("Network response was not ok");
  //       handleComments();
  //       setCommentBody("");
  //     } catch (error) {
  //       console.error("Erro ao criar comentário:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    handleForum();
    handleComments();
  }, []);

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 p-6 bg-[#171524] ">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View className="border-b pb-2">
              <Text className="text-2xl font-medium text-white">
                {forum.title}
              </Text>
            </View>
            <View className="flex-row border rounded-md mt-3 ">
              <Image
                className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                source={{ uri: forum?.profiles?.avatar_url }}
              />
              <View className="flex-1 p-4">
                <Text className="text-xs text-white">
                  {formatDate(forum.created_at)}
                </Text>
                <Text className="text-white">{forum?.description}</Text>
              </View>
            </View>

            <Text className="font-medium mt-4 text-white">Comentários</Text>
            {comments.length === 0 && (
              <Text className="text-white">Nenhum comentário disponível</Text>
            )}
            {comments.map((item) => (
              <View key={item.id} className="border-b border-white/20 pb-3">
                <View className="flex-row p-4">
                  {/* <Avatar
                    src={item?.profiles?.avatar_url}
                    className="h-14 w-14"
                  /> */}
                  <View className="flex-1 ml-4 ">
                    <Text className="text-xs text-white">
                      {formatDate(item?.created_at)}
                    </Text>
                    <Text className="text-white">{item?.comment}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* <View className="flex-row w-full gap-2 mt-4">
              <TextInput
                placeholder="Escreva um comentário..."
                className="flex-1 border rounded p-2"
                multiline
                numberOfLines={3}
                value={commentBody}
                onChangeText={setCommentBody}
              />
              <CustomButton
                title={"mensagi"}
                //   onPress={handleNewComment}
              />
            </View> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ForumInfo;
