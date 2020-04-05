const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
  },
});

CardSchema.statics.createCard = async function (title, board) {
  const Card = this;
  const card = new Card({ title: title, board: board });
  await card.save();

  const success = card._id !== '';
  const message = success ? 'card was created' : `card was not created`;
  return {
    success,
    message,
    card,
  };
};

module.exports = mongoose.model('Card', CardSchema);
