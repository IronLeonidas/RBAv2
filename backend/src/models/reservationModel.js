const db = require("../config/database");

const ReservationModel = {
    async getAllReservations(userId) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT reservation_id as id, r.uuid, r.restaurant_id, date, time, people_count as people, status, res.name FROM reservations as r INNER JOIN restaurants as res ON res.restaurant_id = r.restaurant_id WHERE user_id = ?", [userId]);

        await connection.end();
        return rows;
    },
    async cancelReservation(uuid) {
      const connection = await db.createConnection();
      const [result] = await connection.execute("UPDATE reservations SET status = 'cancelled' WHERE uuid = ?", [uuid]);

      await connection.end();

      return result.affectedRows > 0;
    },
    async deleteReservation(uuid) {
      const connection = await db.createConnection();
      const [result] = await connection.execute("DELETE FROM reservations WHERE uuid = ?", [uuid]);

      await connection.end();

      return result.affectedRows > 0;
    },
    async reservationExists(uuid) {
      const connection = await db.createConnection();
      const [rows] = await connection.execute("SELECT * FROM reservations WHERE uuid = ?", [uuid]);

      await connection.end();

      return rows.length > 0;
    }
};

module.exports = ReservationModel;