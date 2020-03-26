// Require Mongoose
const mongoose = require('mongoose');

const mongoDB =
  'mongodb+srv://Morzaram:va6LnpelMevmPr9V@cluster0-7ycek.azure.mongodb.net/shorturls?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema
const { Schema } = mongoose;

const GoogleURLSchema = new Schema({
  lastLookUp: String,
  reqUrl: String,
  resUrl: String,
  linked: Boolean,
});

const GoogleURL = mongoose.model('GoogleURL', GoogleURLSchema);

// GoogleURL.find()
//   .where('reqURL')
//   .equals(`${reqURL}`)
//   .limit(1)
//   .exec((err, results) => {
//     if (err) return handleError(err);
//     return results;
//   });

module.exports = GoogleURL;
