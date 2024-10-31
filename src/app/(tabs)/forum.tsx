import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRouter } from "expo-router";
import { useAuth } from "@/src/hooks/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { set } from "react-hook-form";
import CustomButton from "../components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";

const Forum = () => {
  const navigation = useNavigation();
  const { session } = useAuth();

  const [foruns, setForuns] = useState([]);
  const router = useRouter();
  const [openForum, setOpenForum] = useState(false);
  const [forumTitle, setforumTitle] = useState("");
  const [forumDescription, setforumDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear() % 100;

    return `${day}/${month}/${year}`;
  }

  const handleForum = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/forums");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Foruns", result);
      setForuns(result);
    } catch (error) {
      console.error("Erro ao recuperar dados:", error);
    }
  };

  const handleNewForum = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://10.0.2.2:3000/forums/new-forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user.id,
          title: forumTitle,
          description: forumDescription,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setforumTitle("");
      setforumDescription("");
      setOpenForum(false);
      setLoading(false);
      handleForum();
    } catch (error) {
      setLoading(false);
      console.error("Erro ao recuperar dados:", error);
    }
  };

  useEffect(() => {
    handleForum();
  }, []);

  return (
    <View className="h-full bg-[#171524]">
      <ScrollView className="pt-12 mb-20">
        <View className=" flex flex-row pb-2 px-5 justify-between items-center">
          <Text className="text-white text-2xl font-bold">Fóruns</Text>
          <CustomButton
            containerStyles="rounded-2xl text-white border-2  border-pink-300  w-16 h-12 flex items-center justify-center"
            handlePress={() => setOpenForum(true)}
          >
            <AntDesign name="plus" size={24} color="pink" />
          </CustomButton>
        </View>
        <View className="h-0.5 w-full bg-white"></View>
        <View className="flex flex-col gap-6 pb-16 pt-2 px-5">
          {foruns
            .slice()
            .reverse()
            .map((item) => (
              <Pressable
                onPress={() => router.push(`../forum/${item.id}`)}
                key={item.id}
              >
                <View className="border-b border-white/20 pb-3">
                  <View className="flex flex-row justify-between">
                    <View className="flex flex-row gap-3 items-center w-[60%]">
                      <Feather
                        name="message-square"
                        size={24}
                        color={"white"}
                      />
                      <Text className="text-xl font-semibold text-white">
                        {item?.title}
                      </Text>
                    </View>

                    <View className="flex flex-row items-center gap-4">
                      <View className="flex flex-col">
                        <Text className="text-white font-semibold">
                          {item?.profiles?.username}
                        </Text>
                        <Text className="text-white text-sm">
                          {formatDate(item?.created_at)}
                        </Text>
                      </View>

                      <Image
                        className="w-12 h-12 rounded-full border-2 border-[#D8ABF4]"
                        source={{ uri: item?.profiles?.avatar_url }}
                      />
                    </View>
                  </View>
                </View>
              </Pressable>
            ))}
        </View>
        <Modal visible={openForum} animationType="fade" transparent={true}>
          <View className="flex-1 justify-center items-center bg-black/50 ">
            <View className="bg-zinc-800 rounded-lg p-6 w-80">
              <View className="flex flex-row justify-between">
                <Text className="text-lg mb-4 text-white">Criar tópico</Text>
                <FontAwesome
                  name="close"
                  size={24}
                  color="white"
                  onPress={() => setOpenForum(false)}
                />
              </View>

              <TextInput
                placeholder="Titulo"
                placeholderClassName="text-zinc-500"
                value={forumTitle}
                onChangeText={setforumTitle}
                multiline
                maxLength={50}
                textAlignVertical="top"
                className="border border-gray-700 mb-1 p-2 text-white rounded-md bg-black/20"
              />
              <TextInput
                placeholder="Descrição"
                placeholderClassName="text-zinc-500"
                value={forumDescription}
                onChangeText={setforumDescription}
                multiline
                numberOfLines={4}
                maxLength={240}
                textAlignVertical="top"
                className="border border-gray-700 mb-1 p-2 text-white rounded-md bg-black/20"
              />
              <Text className="self-end text-white text-sm mb-4">
                {forumDescription.length}/240
              </Text>
              <CustomButton
                title={loading ? "Carregando..." : "Criar Tópico"}
                containerStyles="w-full bg-[#AB72CE] rounded-2xl"
                textStyles={"text-white text-lg"}
                handlePress={handleNewForum}
                isLoading={loading}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Forum;
