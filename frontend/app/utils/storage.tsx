import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

export async function saveTokens(accessToken: string, refreshToken: string) {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, accessToken],
      [REFRESH_KEY, refreshToken],
    ]);
  } catch (err) {
    console.error("Error saving tokens:", err);
    throw err;
  }
}

export async function getTokens() {
  try {
    const values = await AsyncStorage.multiGet([TOKEN_KEY, REFRESH_KEY]);
    const tokenMap = Object.fromEntries(values);

    console.log("getTokens:", tokenMap);

    return {
      accessToken: tokenMap[TOKEN_KEY] || "",
      refreshToken: tokenMap[REFRESH_KEY] || "",
    };
  } catch (err: any) {
    console.error("Error getting tokens:", err);
    return { accessToken: "", refreshToken: "" };
  }
}

export async function removeTokens() {
  try {
    await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY]);
  } catch (err: any) {
    console.error("Error removing tokens:", err);
    throw err;
  }
}
