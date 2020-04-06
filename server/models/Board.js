const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

BoardSchema.statics.createBoard = async function (name, user) {
  const Board = this;
  const board = new Board({ name: name, user: user });
  await board.save();

  const success = board._id !== '';
  const message = success ? 'board was created' : `board was no created`;
  return {
    success,
    message,
    board,
  };
};

module.exports = mongoose.model('Board', BoardSchema);
