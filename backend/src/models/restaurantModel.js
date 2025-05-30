const db = require("../config/database");

const RestaurantModel = {
    async getAllRestaurants(){
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT restaurant_id as id, uuid, name, location, description FROM restaurants");

        await connection.end();

        return rows;
    },
    async getRestaurantById(uuid){
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT restaurant_id as id, uuid, name, location, description FROM restaurants WHERE uuid = ?", [uuid]);

        await connection.end();

        return rows.length ? rows[0] : null;
    },
    async placeReservation(uuid, userId, restaurantId, date, time, people) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("INSERT INTO reservations (uuid, user_id, restaurant_id, date, time, people_count) VALUES (?, ?, ?, ?, ?, ?)", [uuid, userId, restaurantId, date, time, people]);

        await connection.end();

        return result.affectedRows > 0;
    }
};

module.exports = RestaurantModel;