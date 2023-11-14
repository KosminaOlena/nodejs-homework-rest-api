const app = require('./app');

const mongoose = require('mongoose');

const {DB_URI} = process.env;
mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(3000);
    console.info('Database connection successful');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  } )

