const { v4: uuidv4 } = require("uuid");
const RestaurantModel = require("../models/restaurantModel");
const UserModel = require("../models/userModel");

async function getAllRestaurants(_, response) {
  try {
    const restaurants = await RestaurantModel.getAllRestaurants();
    return response.status(200).json({ restaurants });
  } catch (err) {
    console.error("Error fetching restaurants:", err);
    return response
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}

async function getRestaurantById(request, response) {
  const uuid = request.params.id;

  if (!uuid) {
    return response.status(400).json({ message: "Missing id." });
  }

  try {
    const restaurant = await RestaurantModel.getRestaurantById(uuid);

    if (!restaurant) {
      return response.status(404).json({ message: "Restaurant not found." });
    }

    return response.status(200).json({ restaurant });
  } catch (err) {
    console.error("Error fetching restaurant:", err);
    return response
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}

async function placeReservation(request, response) {
  const tokenUser = request.user;
  const restaurantUUID = request.params.id;

  const { date, time, people } = request.body;
  console.log(date, time, people);

  if (!date || !time || !people)
    return response
      .status(400)
      .json({ message: "Missing date, time and/or people." });

  try {
    const user = await UserModel.getUserByEmail(tokenUser.email);
    const restaurant = await RestaurantModel.getRestaurantById(restaurantUUID);

    const reservationUUID = uuidv4();

    await RestaurantModel.placeReservation(reservationUUID, user.id, restaurant.id, date, time, people);

    return response.status(201).json({
      message: `Successfully placed the reservation at ${restaurant.name}`,
    });
  } catch (err) {
    console.error("Error placing reservation:", err);
    return response
      .status(500)
      .json({ message: "Server Error. Please try again later." });
  }
}

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  placeReservation,
};
