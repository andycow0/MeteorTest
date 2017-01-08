import { Players } from '../imports/api/players.js';
import { ScoreMaps } from '../imports/api/scoreMaps.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { check } from 'meteor/check';
// import { Session } from 'meteor/session';
import './main.html';

limitedPlayers = new Meteor.Collection("2Players");

Tracker.autorun(function () {
  Meteor.subscribe("limitedPlayers");
});

//#region playersData
Template.playersData.onCreated(function () {
  // 1. Initialization
  this.testText = "This is test text!";
  var self = this;

  // 2. Autorun
  self.autorun(function () {
    console.log("Asking for David player.");
    // var subscription = Meteor.subscribe('get-players-by-name', 'David');
    var subscription = self.subscribe('limitedPlayers');

    if (subscription.ready()) {
      console.log("> Received David player. \n\n");
      // Tracker.loaded.set(limit);

    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
  });
});


Template.playersData.helpers({
  loadallplayers: function () {
    // return Players.find();
    return limitedPlayers.find();
  },
  searchPlayerDavid: function () {
    return Players.find({ 'name': 'David1' });
  },
  showDavidMap: function () {
    var david = Players.findOne({ name: 'David1' });
    check(david.score, Number);
    var scoreMap = ScoreMaps.find({ score: david.score });
    // return ScoreMaps.find({ score: 10 });
    return scoreMap;
  },
  allPlayers() {
    const instance = Template.instance();
  }
});

Template.playersData.events({
  'submit .insert': function (event, template) {
    // Meteor.call('players.insert', 'David11', 110);
    event.preventDefault();

    var text = event.target.playerName.value;

    console.log("click players button!", text);

    Players.insert({ 'name': text, 'score': 99 });
  },
  'click #deleteButton'(event, template) {
    var text = document.getElementById("deleteName").value;
    console.log(text + ", " + template.testText);
    Session.set("test", "session test");
    console.log(Session.get("test"));
  },
});

//#endregion playersData

//  -- hello --
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  allPlayers() {
    return Players.find({});
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
