import { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

const FormField = ({ placeholder, value, leftIcon }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="rounded-2xl bg-white relative w-full p-4">
      <View className="relative">
        {leftIcon && (
          <View className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <Feather name={leftIcon} size={24} color="black" />
          </View>
        )}

        <TextInput
          className={`w-full h-10 px-10 ${
            leftIcon ? "pl-12" : "pl-3"
          } text-xl font-medium justify-center flex flex-col`} // Adjust padding for left icon
          placeholder={placeholder}
          value={value}
          //onChangeText={handleChangeText}
          placeholderTextColor={"#747688"}
          secureTextEntry={placeholder === "Senha" && !showPassword}
        />
      </View>

      {placeholder === "Senha" && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: 17,
            top: "50%",
          }}
        >
          <View>
            {showPassword ? (
              <Entypo name="eye" size={24} color="black" />
            ) : (
              <Entypo name="eye-with-line" size={24} color="black" />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
