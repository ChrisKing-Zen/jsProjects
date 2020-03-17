var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GenreInstanceSchema = new Schema({
  imprint: { type: String, required: true, min: 3, max: 100 }
});

GenreInstanceSchema.virtual("name").get(function() {
  return "/catalog/genre/" + this._id;
});

module.exports = mongoose.model("Genre", GenreInstanceSchema);
