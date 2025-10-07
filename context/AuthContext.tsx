import { createContext, PropsWithChildren, useContext, useState } from "react";
import { User } from "../interface/user.interface";
import { useRouter } from "expo-router";
import { LoginSchemaType } from "../schema/auth/login.schema";

interface AuthContextType {
  user: User | null;
  login: (userData: LoginSchemaType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (userData: LoginSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      email: userData.email,
      token: "fake-token",
      username: "Usuario",
    });
    router.push("/");
  };

  const logout = async () => {
    setUser(null);
    router.push("/(auth)/auth/login");
  };

  return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
