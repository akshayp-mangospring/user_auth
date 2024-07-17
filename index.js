const dotEnv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const { parsed: { PORT } } = dotEnv;
const db = require('./config/db');
const UserModel = require('./models/User');
const registrationRoutes = require('./config/router/registration');
const authenticateJWT = require('./middlewares/auth');
const todolistRoutes = require('./config/router/todolist');
const app = express();

const initDb = async () => {
  try {
    console.log('Starting database connection.');
    await db.authenticate();
    console.log('Connection has been established successfully.');

    console.log('Started running migrations.');
    await UserModel.sync();
    console.log('Migrations ran successfully.');
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
};

const initApp = () => {
  try {
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());

    app.get('/', (r, w) => {
      w.send({ content: 'Hello, World!' });
    });

    const publicRoutes = [
      { path: '/api', router: registrationRoutes },
    ];

    publicRoutes.forEach(route => {
      app.use(route.path, route.router);
    });

    app.use(authenticateJWT);

    const protectedRoutes = [
      { path: '/api/todolists', router: todolistRoutes }
    ];

    protectedRoutes.forEach(route => {
      app.use(route.path, route.router);
    });

    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT} OR http://127.0.0.1:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start the app: ', err);
  }
};

(() => {
  initDb();
  initApp();
})();
