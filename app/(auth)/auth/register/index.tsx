import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Lucied from "@react-native-vector-icons/lucide";
import Input from "@/components/ui/input/Input";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchemaType,
} from "@/schema/auth/register.schema";
import axios from "axios";
import Load from "@/components/shared/loader/Load";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [showpassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { register, isLoadingRegister } = useAuth();

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
            Registrate para administrar tus gastos
          </Text>
        </View>

        <View className="w-full border border-g-gray-2 p-[17px] bg-white rounded-xl gap-y-3">
          <Input
            label="Username"
            placeholder="Ingresa tu nombre de usuario"
            icon={<Lucied name="user" size={20} />}
            error={errors.username?.message}
            value={watch("username")}
            onChangeText={(text) => setValue("username", text)}
          />
          <Input
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            icon={<MaterialDesignIcons name="email-outline" />}
            error={errors.email?.message}
            onChangeText={(text) => setValue("email", text)}
            value={watch("email")}
          />
          <Input
            label="Contraseña"
            placeholder="*******"
            secureTextEntry={!showpassword}
            icon={
              showpassword ? <Lucied name="eye-off" /> : <Lucied name="eye" />
            }
            onPressIcon={() => setShowPassword(!showpassword)}
            error={errors.password?.message}
            value={watch("password")}
            onChangeText={(text) => setValue("password", text)}
          />

          <Input
            label="Confirmar contraseña"
            placeholder="*******"
            secureTextEntry={!showconfirmPassword}
            icon={
              showconfirmPassword ? (
                <Lucied name="eye-off" />
              ) : (
                <Lucied name="eye" />
              )
            }
            onPressIcon={() => setShowconfirmPassword(!showconfirmPassword)}
            error={errors.confirmPassword?.message}
            value={watch("confirmPassword")}
            onChangeText={(text) => setValue("confirmPassword", text)}
          />

          <Pressable onPress={handleSubmit(register)}>
            <Text className="text-center text-white bg-g-green-2 py-3 rounded-lg font-semibold">
              Iniciar sesión
            </Text>
          </Pressable>
        </View>

        <View className="w-full bg-white p-[17px] border border-g-gray-2 rounded-xl">
          <Link
            href="/(auth)/auth/login"
            className="font-semibold text-center text-g-gray-1"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </View>
      </KeyboardAwareScrollView>

      <Load visible={isLoadingRegister} />
    </SafeAreaView>
  );
}
