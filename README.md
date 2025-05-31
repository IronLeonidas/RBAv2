RESTAURANT BOOKING APP - FULLSTACK SETUP GUIDE

This application is a fullstack project composed of a React Native frontend (using Expo) and a Node.js backend, connected to a MySQL database. Follow the instructions below to run the project locally on your machine.

FOLDER STRUCTURE:

- Backend/
- Frontend/

---

1. DATABASE SETUP

---

1. Open the XAMPP Control Panel.
2. Start the "Apache" and "MySQL" modules.
3. In your browser, go to: http://localhost/phpmyadmin
4. Click on the "Import" tab.
5. Select the file named "lskianis22b_db1.sql" provided in the project ZIP file.
6. Import the file and name the database: rba-database
7. If MySQL is running on a port other than 3306, open the file:
   Backend/.envproduction
   and update the DB_PORT and DB_HOST fields accordingly.

Once imported, you should see the rba-database listed in phpMyAdmin with the required tables.

---

2. RUNNING THE BACKEND SERVER

---

1. Open Visual Studio Code and open the project folder.
2. Open a terminal and navigate to the Backend folder:
   cd Backend
3. If needed, install dependencies by running:
   npm install
4. Start the backend server by running:
   npm run dev

The backend server should now be running and connected to the MySQL database.

---

3. RUNNING THE FRONTEND (ANDROID APP)

---

1. Open a new terminal in Visual Studio Code and navigate to the Frontend folder:
   cd Frontend
2. If needed, install dependencies by running:
   npm install
3. Make sure you have an Android emulator running in Android Studio.
4. Start the Expo application by running:
   npm run android

Expo will build the app and automatically launch it on the Android emulator.

---

4. USING THE APP

---

- If all previous steps are completed successfully, the app will open in the Android emulator.
- The app communicates with the local backend server and uses the rba-database imported in phpMyAdmin.
- All features (viewing restaurants, bookings, etc.) should now be available and functional through the emulator.

---

## NOTES

- If you encounter any errors related to missing dependencies, run "npm install" inside both the Backend and Frontend folders.
- Ensure the MySQL port in .envproduction matches the port used by XAMPP (default is 3306).
