const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'movie',
    },
    rate: {
      type: Number,
      requred: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
);

const ReviewModel = mongoose.model('review', ReviewSchema);

module.exports = ReviewModel;
