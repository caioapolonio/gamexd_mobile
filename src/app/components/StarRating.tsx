import React from "react";
import { View, Text } from "react-native";
import { BiSolidStar } from "react-icons/bi";

const StarRating = ({ rating }) => {
  return (
    <View className="flex-row items-center gap-1">
      <View className="flex-row items-center">
        {[...Array(5)].map((_, index) => (
          <BiSolidStar
            key={index}
            size={20}
            className={
              index + 1 > rating ? "text-neutral-900/50" : "text-yellow-500"
            } // Conditional styling
          />
        ))}
      </View>
      <Text className="text-base text-black">
        {rating.toFixed(1)} <Text className="sr-only">Stars</Text>
      </Text>
    </View>
  );
};

export default StarRating;
