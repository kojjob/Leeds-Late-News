const express = require("express");
const app = express()


const apiRouter = require("./routes/apiRoutes");
const {
  handleCustomErrors,
  handlePsqlErrors
} = require('./errors/index')


app.use(express.json());
app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
  res.status(404).send({
    msg: "Path not Found"
  })
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);


module.exports = app;