const express = require('express');
const router = require('./router');
const path = require('path');

const app = express();

const middlewares = [express.json(), express.urlencoded({ extended: true })];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(middlewares);
app.use(router);

app.listen('1337');
