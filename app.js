//jshint esversion:6

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/fruitsDB', { useNewUrlParser: true });
  console.log("Connected");

  const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
  });

  const Fruit = mongoose.model('Fruit', fruitSchema);

  const fruit = new Fruit({
    name: 'Apple',
    score: 7,
    review: 'Pretty solid as a fruit.'
  });

  // fruit.save();

  const personSchema = new mongoose.Schema ({
    name: String,
    age: Number
  });

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: "Ayala",
  age: 24
});

person.save();

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best fruit!"
});

const orange = new Fruit({
  name: "Orange",
  score: 10,
  review: "Gives me Energy!"
});

const banana = new Fruit({
  name: "Banana",
  score: 10,
  review: "Awesome for smoothies!"
});

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});


//Remember that all the code has to be within the main function in order for it to work (except for the 'require' thing of course)
}
