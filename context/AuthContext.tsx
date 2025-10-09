import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ResponseUser, User } from "../interface/user.interface";
import { useRouter } from "expo-router";
import { LoginSchemaType } from "../schema/auth/login.schema";
import { RegisterSchemaType } from "../schema/auth/register.schema";
import { useMutation } from "../hooks/useMutation";
import { ApiResponse } from "../interface/response.interface";
import axios from "../utils/axios";

interface AuthContextType {
  user: User | null;
  token: string;
  login: (userData: LoginSchemaType) => void;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  register: (userData: RegisterSchemaType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>("");

  const router = useRouter();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation<
    ApiResponse<ResponseUser>,
    LoginSchemaType
  >({
    mutationFn: async (data) => {
      const res = await axios.post(`/auth/login`, {
        username: data.username,
        password: data.password,
      });
      return res.data;
    },
    onSuccess: ({ body }) => {
      setUser(body.user);
      setToken(body.token);
      router.push("/");
    },
  });

  const { mutate: register, isLoading: isLoadingRegister } = useMutation<
    ApiResponse<ResponseUser>,
    RegisterSchemaType
  >({
    mutationFn: async (data) => {
      const res = await axios.post(`/auth/register`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return res.data;
    },
    onSuccess: ({ body }) => {
      setUser(body.user);
      setToken(body.token);
      router.push("/");
    },
  });

  const logout = async () => {
    setUser(null);
    setToken("");
    router.push("/(auth)/auth/login");
  };

  return (
    <AuthContext
      value={{
        user,
        token,
        login,
        logout,
        register,
        isLoadingLogin,
        isLoadingRegister,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
