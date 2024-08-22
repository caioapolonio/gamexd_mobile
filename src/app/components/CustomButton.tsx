import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyles,
}) => {
  return (
    <View
      className={`bg-white rounded-lg relative min-h-16 justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        <Text className={`text-black font-semibold text-lg ${textStyles}`}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
