import { API_BASE_URL } from "../config/APIConfig";

const AUTH_API_URL = `${API_BASE_URL}/authentication`;

export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: ResponseLogin = await response.json();

    if (!response.ok || !data.accessToken || !data.refreshToken)
      throw new Error(data.message || "Login failed");

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (err: any) {
    throw new Error(`Failed to login: ${err.message}`);
  }
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const response = await fetch(`${AUTH_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data: ResponseMessage = await response.json();

    if (!response.ok) throw new Error(data.message || "Registration failed");

    return data.message;
  } catch (err: any) {
    throw new Error(`Failed to register: ${err.message}`);
  }
}

export async function refreshToken(refreshToken: string) {
  try {
    const response = await fetch(`${AUTH_API_URL}/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data: ResponseRefresh = await response.json();

    if (!response.ok || !data.accessToken)
      throw new Error(data.message || "Refreshing token failed");

    return data.accessToken;
  } catch (err: any) {
    throw new Error(`Failed to refresh token: ${err.message}`);
  }
}

export async function logoutUser(accessToken: string) {
  try {
    const response = await fetch(`${AUTH_API_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: ResponseMessage = await response.json();

    if (!response.ok) throw new Error(data.message || "Logout failed");

    return data.message;
  } catch (err: any) {
    throw new Error(`Failed to logout: ${err.message}`);
  }
}

type ResponseMessage = {
  message?: string;
};

type ResponseRefresh = ResponseMessage & {
  accessToken?: string;
};

type ResponseLogin = ResponseRefresh & {
  refreshToken?: string;
};
