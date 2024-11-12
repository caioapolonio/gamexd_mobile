import React from "react";
import { View } from "react-native";

const Loader = ({ card }) => {
  // Determine width and height based on the 'card' prop
  const dimensions = card ? "w-48 h-48" : "w-48 h-64";

  return (
    <View className={`flex flex-col items-center gap-2 ${dimensions}`}>
      <View className="w-full h-full bg-neutral-700 rounded-lg animate-pulse" />
    </View>
  );
};

export default Loader;
