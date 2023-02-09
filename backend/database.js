const mongoose = require('mongoose');

const { DATABASE_HOST, DATABASE_NAME } = process.env;

mongoose.connect(`mongodb://${DATABASE_HOST}/${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`Database ${DATABASE_NAME} connected`))
  .catch(err => console.log(err));
