export type RootStackParamList = {
  Tabs: undefined;
  Login: undefined;
  Register: undefined;
  Restaurants: undefined;
  Restaurant: { id: string };
  PlaceReservation: { name: string; id: string };
  Reservations: undefined;
};

export type Restaurant = {
  id: number;
  uuid: string;
  name: string;
  location: string;
  description: string;
};

export type Reservation = {
  id: number;
  uuid: string;
  restaurant_id: number;
  date: string;
  time: string;
  people: number;
  status: "pending" | "cancelled" | "accepted";
  name: string;
};
