const ReservationModel = require("../models/reservationModel");
const UserModel = require("../models/userModel");

async function getAllReservations(request, response) {
  const tokenUser = request.user;

  try {
    const user = await UserModel.getUserByEmail(tokenUser.email);
    const reservations = await ReservationModel.getAllReservations(user.id);

    return response.status(200).json({ reservations });
  } catch (err) {
    console.error("Error fetching reservations:", err);
    return response
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}

async function cancelReservation(request, response) {
  const reservationUUID = request.params.id;

  const reservationExists = await ReservationModel.reservationExists(
    reservationUUID
  );
  if (!reservationExists)
    return response.status(404).json({ message: "Reservation not found." });

  try {
    await ReservationModel.cancelReservation(reservationUUID);

    return response
      .status(204)
      .send();
  } catch (err) {
    console.error("Error cancelling reservation:", err);
    return response
      .status(500)
      .json({ message: "Server error. Please try again late.r" });
  }
}

async function deleteReservation(request, response) {
  const reservationUUID = request.params.id;

  const reservationExists = await ReservationModel.reservationExists(
    reservationUUID
  );
  if (!reservationExists)
    return response.status(404).json({ message: "Reservation not found." });

  try {
    await ReservationModel.deleteReservation(reservationUUID);

    return response
      .status(204)
      .send();
  } catch (err) {
    console.error("Error deleting reservation:", err);
    return response
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}

module.exports = {
  getAllReservations,
  cancelReservation,
  deleteReservation,
};
