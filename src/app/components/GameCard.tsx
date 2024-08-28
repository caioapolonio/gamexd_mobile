import React from "react";
import { View, Text, Image } from "react-native";

const GameCard = ({ title, src, card, banner }) => {
  return (
    <View className="flex flex-col items-center gap-2 w-48 h-96">
      <View className="relative rounded-lg overflow-hidden shadow-md flex flex-col w-48 h-64 bg-purple-500">
        <Text className="truncate px-2 py-1  text-neutral-50 border-b border-neutral-50 text-base">
          {title}
        </Text>
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={{ uri: src }}
        />
      </View>
    </View>
  );
};

export default GameCard;
