var dog = {
    name: "Oladushek",
    legs: 4,
    isAwesome: true
};
console.log(dog.name);

dog.age = 6;
console.log(dog);

dog.bark = function () {
    console.log("Гав-гав! Меня зовут " + this.name + "!");
};
dog.bark();

var speak = function () {
    console.log(this.sound + "! Меня зовут " + this.name + "!");
};
var cat = {
    sound: 'Meow',
    name: 'Varejka',
    speak: speak
};
cat.speak();

var pig = {
    sound: 'Hrue',
    name: 'Charlee',
    speak: speak
};
var horse = {
    sound: 'I-go-go',
    name: 'Mary',
    speak: speak
};
pig.speak();
horse.speak();