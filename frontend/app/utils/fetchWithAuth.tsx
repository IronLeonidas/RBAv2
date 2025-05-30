import { refreshToken } from "../apis/AuthAPI";
import { getTokens, removeTokens, saveTokens } from "./storage";

export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> {
  // 1) Attach the current access token
  const tokens = await getTokens();
  const headers = new Headers(init.headers);
  if (tokens.accessToken) {
    headers.set("Authorization", `Bearer ${tokens.accessToken}`);
  }

  // 2) Perform the request
  let response = await fetch(input, { ...init, headers });

  // 3) If 401, try refreshing once
  if (response.status === 401) {
    try {
      // your function that exchanges refreshToken for a new access token
      const newAccessToken = await refreshToken(tokens.refreshToken);

      await saveTokens(newAccessToken, tokens.refreshToken);

      // retry original request with new token
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      response = await fetch(input, { ...init, headers });
    } catch (err: any) {
      console.error('Token refresh failed, logging out user:', err.message);
      
      // Clear tokens - this will trigger logout in AuthContext... maybe
      await removeTokens();
      
      // Throw additional error
      throw new Error('Session expired. Please login again.');
    }
  }

  return response;
}
