import React from "react";
import { Link, router } from "expo-router";
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { supabase } from "../../db/supabase";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (e) => {
    const { email, username, password } = e;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username);
      if (error) {
        console.error(
          "Um erro ocorreu ao verificar o nome de usuário. ",
          error
        );
        Alert.alert(
          "Um erro ocorreu ao verificar a disponibilidade do nome de usuário."
        );
        return;
      }

      if (data.length > 0) {
        Alert.alert("Esse nome de usuário não está disponível, tente outro.");
        return;
      }
    } catch (error) {
      console.error("Um erro ocorreu ao verificar o nome de usuário.", error);
      Alert.alert(
        "Um erro ocorreu ao verificar a disponibilidade do nome de usuário."
      );
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      console.log(error);
      Alert.alert(error.message);
    } else {
      const { error } = await supabase
        .from("profiles")
        .update([
          {
            username: username,
            avatar_url:
              "https://i.pinimg.com/736x/ee/79/41/ee7941e54053f388bbc8f4fb043765b6.jpg",
          },
        ])
        .eq("id", data?.user?.id);

      if (error) {
        Alert.alert("Erro ao criar perfil.", error.message);
        return;
      } else {
        Alert.alert("Perfil criado com sucesso! " + data?.user?.email);
        router.push("/home");
      }

      console.log("EVENT", e);
      console.log("DATA", data);
    }
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
                required: "Nome de usuário é obrigatório",
                minLength: {
                  value: 4,
                  message: "Nome de usuário deve ter no mínimo 4 caracteres",
                },
                maxLength: {
                  value: 15,
                  message: "Nome de usuário deve ter no máximo 15 caracteres",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_-]+$/,
                  message:
                    "Nome de usuário deve conter apenas letras, números, hífens e underscores",
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
                required: "Email é obrigatório",
                pattern: {
                  value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                  message: "Use um e-mail válido",
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
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "Senha deve ter no mínimo 6 caracteres",
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
                required: "Por favor confirme sua senha",
                validate: (value) =>
                  value === getValues("password") || "Senhas não coincidem",
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
              title="Criar Conta"
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
