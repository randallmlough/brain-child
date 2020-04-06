const mongoose = require('mongoose');
require('../models');
const { mongo_uri: db } = require('../config');

const bcrypt = require('bcryptjs');

const User = mongoose.model('User');
const Board = mongoose.model('Board');
const List = mongoose.model('List');
const Card = mongoose.model('Card');

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const resetDB = async () => {
  await User.deleteMany({});
  await Board.deleteMany({});
  await List.deleteMany({});
  await Card.deleteMany({});
};

const seedDatabase = async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  const user = new User({
    email: 'demo@example.com',
    password: hashedPassword,
  });
  await user.save();

  const { Faker } = require('fakergem');
  const boards = [];
  for (let j = 0; j < 3; j++) {
    const board = new Board({ name: Faker.Book.title(), user: user._id });
    boards.push(await board.save());

    user.boards.push(board._id);
    await user.save();
  }

  const lists = [];
  for (let j = 0; j < 5; j++) {
    const randomBoard = boards[Math.floor(Math.random() * boards.length)];
    const list = new List({ name: Faker.Book.title(), board: randomBoard._id });
    lists.push(await list.save());

    randomBoard.lists.push(list._id);
    await randomBoard.save();
  }

  const cards = [];
  for (let i = 0; i < 10; i++) {
    const randomList = lists[Math.floor(Math.random() * lists.length)];
    const card = new Card({
      title: Faker.Book.title(),
      list: randomList._id,
    });
    cards.push(await card.save());

    randomList.cards.push(card._id);
    await randomList.save();
  }

  mongoose.connection.close();
};

resetDB()
  .then(() => console.log('Successfully reset database'))
  .catch((e) => console.log('An error occurred while resetting', e));

seedDatabase()
  .then(() => console.log('Successfully seeded database'))
  .catch((e) => console.log('An error occurred while seeding', e));
