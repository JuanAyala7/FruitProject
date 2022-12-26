//jshint esversion:6

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/fruitsDB', { useNewUrlParser: true });
  console.log("Connected");

  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your data entry, no name specified."]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });

  const Fruit = mongoose.model('Fruit', fruitSchema);

  const fruit = new Fruit({
    rating: 10,
    review: 'Peaches are solid as a fruit.'
  });

  //fruit.save();

  const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
  });

const Person = mongoose.model("Person", personSchema);

// const pineapple = new Fruit({
//   name: "Pineapple",
//   score: 9,
//   review: "Very sweet!"
// });

const strawberry = new Fruit({
  name: "strawberry",
  score: 7,
  review: "Great for a pie!"
});

strawberry.save();

Person.updateOne({name: "Ayala"}, {favoriteFruit: strawberry}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated document.");
  }
});

// const person = new Person({
//   name: "Essence",
//   age: 25,
//   favoriteFruit: pineapple
// });

// person.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   score: 10,
//   review: "Gives me Energy!"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 10,
//   review: "Awesome for smoothies!"
// });
//
//  Fruit.insertMany([kiwi, orange, banana], function(err){
//    if (err) {
//      console.log(err);
//    } else {
//      console.log("Successfully saved all the fruits to fruitsDB");
//    }
//  });

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

 // Fruit.updateOne({_id: "63a8ed4c6c88976eccae2b5c"}, {name: "Peach"}, function(err){
 //   if (err){
 //     console.log(err);
 //   } else {
 //     console.log("Successfully updated the document.");
 //   }
 // });

// Fruit.deleteOne({name: "Peach"}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("Item has been deleted from the document.");
//   }
// });

// Person.deleteMany({name: "Ayala"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted items from document.");
//   }
// });


//Remember that all the code has to be within the main function in order for it to work (except for the 'require' thing of course)
}
