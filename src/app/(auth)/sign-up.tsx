import React from "react";
import { Link } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission, e.g., send data to an API
  };

  return (
    <SafeAreaView className="bg-[#171524] h-full flex-1">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center pt-16 h-full px-4 flex flex-col gap-6">
          <View className="w-full flex">
            <Text className="text-white font-base text-3xl">Criar conta</Text>

            <Controller
              control={control}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
                maxLength: {
                  value: 15,
                  message: "Username cannot exceed 15 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Username can only contain letters, numbers, underscores, and hyphens. No spaces allowed.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder="Nome de usuário"
                  leftIcon={"user"}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text className="text-red-500">{errors.username.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder="Email"
                  leftIcon={"mail"}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder="Senha"
                  leftIcon={"lock"}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  placeholder="Confirmar senha"
                  leftIcon={"lock"}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text className="text-red-500">
                {errors.confirmPassword.message}
              </Text>
            )}

            <CustomButton
              title="Entrar"
              handlePress={handleSubmit(onSubmit)}
              containerStyles="w-full mt-4 bg-[#AB72CE] rounded-2xl "
              textStyles="text-white text-2xl uppercase font-normal"
            />
          </View>

          <View>
            <Text className="text-white text-lg italic">
              Já possui uma conta?
              <Link href="/sign-in" className="text-[#AB72CE]">
                {" "}
                Entre aqui!
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
