function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function() {
    alert("Hi! I`m " + this.name + ".");
  };
  return obj;
}

var salva = createNewPerson("Salva");
salva.name;
salva.greeting;

function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert("Hi! I`m " + this.name + ".");
  };
}

var person1 = new Person("Bob");
var person2 = new Person("Sarah");

function Person(first, last, age, gender, interests) {
  this.name = {
    first: first,
    last: last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(
      this.name.first +
        " " +
        this.name.last +
        " is " +
        this.age +
        " years old. He likes " +
        this.interests[0] +
        this.interests[1] +
        "."
    );
  };
  this.greeting = function() {
    alert("Hi! I`m " + this.name.first + ".");
  };
}

var person1 = new Person("Bob", "Smith", 32, "male", ["music", "skiing"]);
person1["age"];
person1.interests[1];
person1.bio();
