const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = mongoose.model('List');

const CardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  label: {
    type: String,
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

CardSchema.statics.updateCard = async function (id, input) {
  const Card = this;
  try {
    const res = await Card.findOneAndUpdate({ _id: id }, input, {
      new: true,
      rawResult: true,
    });
    const success = res.ok;
    const message = success ? 'card was updated' : `card failed to update`;
    const card = res.value;
    return {
      success,
      message,
      card,
    };
  } catch (error) {
    return {
      success: false,
      message: 'failed to update card. Double check card ID',
    };
  }
};

CardSchema.statics.deleteCard = async function (id) {
  const Card = this;
  try {
    const res = await Card.deleteOne({ _id: id });
    const success = res.ok;
    const message = success ? 'card was deleted' : `card failed to delete`;
    return {
      success,
      message,
    };
  } catch (error) {
    return {
      success: false,
      message: 'failed to delete card. Double check card ID',
    };
  }
};
module.exports = mongoose.model('Card', CardSchema);
