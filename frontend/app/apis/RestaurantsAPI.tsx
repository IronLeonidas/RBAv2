import { API_BASE_URL } from "../config/APIConfig";
import { Restaurant } from "../types";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const RESTAURANTS_API_URL = `${API_BASE_URL}/restaurants`;

export async function fetchRestaurants() {
  try {
    const response = await fetchWithAuth(`${RESTAURANTS_API_URL}/`);

    const data: ResponseRestaurants = await response.json();

    if (!response.ok || !data.restaurants)
      throw new Error(data.message || "Fetching restaurants failed");

    return data.restaurants;
  } catch (err: any) {
    throw new Error(`Failed to fetch restaurants: ${err.message}`);
  }
}

export async function fetchRestaurantById(uuid: string) {
  try {
    const response = await fetchWithAuth(`${RESTAURANTS_API_URL}/${uuid}`);

    const data: ResponseRestaurant = await response.json();

    if (!response.ok || !data.restaurant)
      throw new Error(data.message || "Restaurant not found.");

    return data.restaurant;
  } catch (err: any) {
    throw new Error(`Failed to fetch restaurant: ${err.message}`);
  }
}

export async function placeReservation(
  uuid: string,
  date: Date,
  people: number
) {
  try {
    const response = await fetchWithAuth(
      `${RESTAURANTS_API_URL}/${uuid}/reservation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date.toISOString().slice(0, 10),
          time: date.toISOString().substring(11, 19),
          people,
        }),
      }
    );

    const data: ResponseMessage = await response.json();

    if (!response.ok) throw new Error(data.message || "Reservation failed");

    return data.message;
  } catch (err: any) {
    throw new Error(`Failed to place reservation: ${err.message}`);
  }
}

type ResponseMessage = {
  message?: string;
};

type ResponseRestaurants = ResponseMessage & {
  restaurants: Restaurant[];
};

type ResponseRestaurant = ResponseMessage & {
  restaurant: Restaurant;
};
