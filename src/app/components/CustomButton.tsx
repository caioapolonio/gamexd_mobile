import { Pressable, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyles,
  children,
}) => {
  return (
    <Pressable
      onPress={handlePress}
      disabled={isLoading}
      className={`relative min-h-16 justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {children ? (
        children
      ) : (
        <Text className={`text-black font-semibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default CustomButton;
