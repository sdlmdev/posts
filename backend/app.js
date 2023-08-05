require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const config = require('./config');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimit');
const { errors } = require('celebrate');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('Подключено к MongoDB');

    await app.listen(config.PORT);
    console.log(`Сервер запущен на порте: ${config.PORT}`);
  } catch (err) {
    console.log(`При запуске сервера произошла ошибка ${err}`);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(limiter);
app.use(helmet());
app.use(router);
app.use(requestLogger);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

startServer();
