require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./errors/errorHandler');
const routes = require('./routes');

const { NODE_ENV, DB_URL, PORT = 3000 } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(cors({
  Origin: 'https://legion3d.students.nomoredomainssbs.ru/ http://localhost:3001/',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app at port ${PORT}`);
});
