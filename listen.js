const port = process.env.port || 9090;

const app = require('./app');


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})