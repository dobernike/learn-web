import { Template } from "meteor/templating";
import { Notes } from "../lib/collection.js.js";
// import { ReactiveVar } from 'meteor/reactive-var';

import "./main.html";

Template.body.helpers({
  // notes: [{
  //     text: 'My Note 1'
  //   },
  //   {
  //     text: 'My Note 2'
  //   },
  //   {
  //     text: 'My Note 3'
  //   }
  // ]
  notes() {
    return Notes.find({});
  }
});
// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
