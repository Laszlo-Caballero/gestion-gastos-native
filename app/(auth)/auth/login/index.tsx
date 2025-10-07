import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import Lucied from "@react-native-vector-icons/lucide";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../../../components/ui/input/Input";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Link } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchemaType,
} from "../../../../schema/auth/login.schema";
import { useAuth } from "../../../../context/AuthContext";

export default function index() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();

  const onSubmit = (data: LoginSchemaType) => {
    login(data);
  };

  return (
    <SafeAreaView className="flex-1 flex gap-y-4 justify-center bg-g-green-3">
      <KeyboardAwareScrollView
        contentContainerClassName="gap-y-4 px-4 flex-1 justify-center"
        enableOnAndroid={true}
      >
        <View className="flex flex-col items-center gap-y-2">
          <View className="p-[15px] bg-g-green-1 flex size-[56px] rounded-[48px]">
            <Lucied name="wallet" size={26} />
          </View>
          <Text className="text-g-black text-xl font-semibold">Gastos App</Text>
          <Text className="text-g-gray-1 font-semibold">
            Administra tus gastos de forma sencilla
          </Text>
        </View>

        <View className="w-full border border-g-gray-2 p-[17px] bg-white rounded-xl gap-y-3">
          <Input
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            icon={<MaterialDesignIcons name="email-outline" />}
            value={watch("email")}
            onChangeText={(text) => setValue("email", text)}
            error={errors.email?.message}
          />

          <Input
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            icon={
              showPassword ? <Lucied name="eye-off" /> : <Lucied name="eye" />
            }
            secureTextEntry={!showPassword}
            onPressIcon={() => setShowPassword(!showPassword)}
            value={watch("password")}
            onChangeText={(text) => setValue("password", text)}
            error={errors.password?.message}
          />

          <Link href="/(auth)/auth/register" className="font-semibold">
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Pressable onPress={handleSubmit(onSubmit)}>
            <Text className="text-center text-white bg-g-green-2 py-3 rounded-lg font-semibold">
              Iniciar sesión
            </Text>
          </Pressable>
        </View>
        <View className="w-full bg-white p-[17px] border border-g-gray-2 rounded-xl">
          <Link
            href="/(auth)/auth/register"
            className="font-semibold text-center text-g-gray-1"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
