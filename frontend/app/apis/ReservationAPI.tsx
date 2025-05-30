import { API_BASE_URL } from "../config/APIConfig";
import { Reservation } from "../types";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const RESERVATIONS_API_URL = `${API_BASE_URL}/reservations`;

export async function fetchReservations() {
  try {
    const response = await fetchWithAuth(`${RESERVATIONS_API_URL}/`);

    const data: ResponseReservations = await response.json();

    if (!response.ok || !data.reservations)
      throw new Error(data.message || "Fetching reservations failed");

    return data.reservations;
  } catch (err: any) {
    throw new Error(`Failed to fetch reservations: ${err.message}`);
  }
}

export async function cancelReservation(uuid: string) {
  try {
    const response = await fetchWithAuth(
      `${RESERVATIONS_API_URL}/${uuid}/cancel`,
      {
        method: "POST",
      }
    );

    if (!response.ok) throw new Error("Cancelling reservation failed");

    return;
  } catch (err: any) {
    throw new Error(`Failed to cancel reservation: ${err.message}`);
  }
}

export async function removeReservation(uuid: string) {
  try {
    const response = await fetchWithAuth(`${RESERVATIONS_API_URL}/${uuid}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Removing reservation failed");

    return;
  } catch (err: any) {
    throw new Error(`Failed to remove reservation: ${err.message}`);
  }
}

type ResponseMessage = {
  message?: string;
};

type ResponseReservations = ResponseMessage & {
  reservations: Reservation[];
};
