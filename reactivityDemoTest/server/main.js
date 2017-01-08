import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import { ScoreMaps } from '../imports/api/scoreMaps.js';

Meteor.startup(() => {
    // code to run on server at startup
    // const count = Players.find().count();

    // if (count === 0) {
    //     Players.insert({ name: "David6", score: 60 });
    // }
});


// Meteor.publish('allPlayers', function getPlayers() {
//     return Players.find();
// });
// Meteor.publish('get-players-by-name', function playersPublication(name) {

//     var player = Players.find({ 'name': name });

//     if (player) {
//         return player;
//     }
//     return this.ready();
// });