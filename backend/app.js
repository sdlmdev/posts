const express = require('express');
const config = require('./config');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();

const startServer = async () => {
  try {
    await app.listen(config.PORT);

    console.log(`Сервер запущен на порте: ${config.PORT}`);
  } catch (err) {
    console.log(`При запуске сервера произошла ошибка ${err}`);
  }
};

app.use(cors);
app.use(router);
app.use(requestLogger);
app.use(errorLogger);
app.use(handleError);

startServer();
