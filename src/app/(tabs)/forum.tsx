import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  Pressable,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, useRouter } from "expo-router";

const Forum = () => {
  const navigation = useNavigation();

  const [foruns, setForuns] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    handleForum();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="bg-[#171524] h-full pt-16">
        <View className="pb-6 px-5">
          <Text className="text-white text-lg">Fóruns</Text>
          <View className="h-0.5 w-full bg-white"></View>
        </View>
        <View className="flex flex-col gap-6 pb-6 px-5">
          {foruns.map((item) => (
            <Pressable
              onPress={() => router.push(`../forum/${item.id}`)}
              key={item.id}
            >
              <View className="border-b border-white/20 pb-3">
                <View className="flex flex-row justify-between">
                  <View className="flex flex-row gap-3 items-center w-[60%]">
                    <Feather name="message-square" size={24} color={"white"} />
                    <Text className="text-xl font-semibold text-white">
                      {item?.title}
                    </Text>
                  </View>

                  <View className="flex flex-row items-center gap-4">
                    <View className="flex flex-col">
                      <Text className="text-white">
                        {item?.profiles?.username}
                      </Text>
                      {/* <Text className="text-xs">{formatDate(item?.created_at)}</Text> */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forum;
