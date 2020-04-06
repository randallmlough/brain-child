const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = mongoose.model('List');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
  },
});

CardSchema.statics.createCard = async function (title, list) {
  const Card = this;
  const card = new Card({ title: title, list: list });
  await card.save();

  const success = card._id !== '';
  if (success) {
    const l = await List.findById(list);
    l.cards.push(card._id);
    await l.save();
  }
  const message = success ? 'card was created' : `card was not created`;
  return {
    success,
    message,
    card,
  };
};

module.exports = mongoose.model('Card', CardSchema);
