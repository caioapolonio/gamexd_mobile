import React from "react";
import { View, Text, Image, Pressable } from "react-native";

const GameCard = ({ title, src, card, onPress }) => {
  // Determine width and height based on the 'card' prop
  const dimensions = card ? "w-48 h-48" : "w-48 h-64";

  return (
    <Pressable onPress={onPress}>
    <View className={`flex flex-col items-center gap-2 ${dimensions}`}>
      <View className="relative rounded-lg overflow-hidden shadow-md flex flex-col bg-purple-500 w-full h-full">
        <Text
          numberOfLines={1}
          className="px-2 py-1 text-neutral-50 border-b border-neutral-50 text-base"
        >
          {title}
        </Text>
        <Image
          className="w-full h-full"
          style={{ resizeMode: "cover" }}
          source={{ uri: src }}
        />
      </View>
    </View>
    </Pressable>
  );
};

export default GameCard;
