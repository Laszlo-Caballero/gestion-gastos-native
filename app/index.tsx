import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import "../global.css";
import { Pressable, Text, View } from "react-native";

export default function HomePage() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <Redirect href="/(auth)/auth/login" />;
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
        {` Logged in as ${user.username}`}
      </Text>

      <Pressable>
        <Text className="text-lg font-medium text-red-500" onPress={logout}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
}
