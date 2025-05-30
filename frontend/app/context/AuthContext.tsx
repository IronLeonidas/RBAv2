import { ReactNode, createContext, useEffect, useState } from "react";
import { loginUser, logoutUser } from "../apis/AuthAPI";
import { getTokens, removeTokens, saveTokens } from "../utils/storage";

export type AuthCTX = ReturnType<typeof useProvideAuth>;

export const AuthContext = createContext<AuthCTX>({
  userToken: "",
  isLoading: false,
  login: async (_email, _password) => {},
  logout: async () => {},
});

function useProvideAuth() {
  const [userToken, setUserToken] = useState<string>("");
  const [refreshTokenValue, setRefreshTokenValue] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTokens() {
      try {
        const { accessToken, refreshToken } = await getTokens();
        setUserToken(accessToken);
        setRefreshTokenValue(refreshToken);
      } catch (err: any) {
        console.error("Error loading tokens:", err);
      } finally {
        console.log("Finished loading AuthContext");
        setIsLoading(false);
      }
    }
    loadTokens();

    setTimeout(() => setIsLoading(false), 5000);
  }, []);

  async function login(email: string, password: string) {
    setIsLoading(true);
    try {
      const { accessToken, refreshToken: newRefreshToken } = await loginUser(
        email,
        password
      );
      await saveTokens(accessToken, newRefreshToken);
      setUserToken(accessToken);
      setRefreshTokenValue(newRefreshToken);
    } catch (err: any) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    try {
      if (userToken) await logoutUser(userToken);
      else if (refreshTokenValue) await logoutUser(refreshTokenValue);
    } catch (err: any) {
      console.warn("Logout error (probably expired):", err.message);
    }
    await removeTokens();
    setUserToken("");
    setRefreshTokenValue("");
    setIsLoading(false);
  }

  return {
    userToken,
    isLoading,
    login,
    logout,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
