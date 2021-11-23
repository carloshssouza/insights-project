const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/routes.js');

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(routes)

//Iniciando o servidor
app.listen(PORT, () => {
  console.log("Server has started on port 8000");
});
