const mongoose = require("mongoose");

// Movie table equivalent
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String },
  releaseYear: { type: Number },
  rating: { type: Number }
});

module.exports = mongoose.model("Movie", movieSchema);
