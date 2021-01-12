const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    castAndCrew: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const MovieModel = mongoose.model('movie', MovieSchema);

module.exports = MovieModel;
