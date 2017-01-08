import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Players = new Mongo.Collection('players');
// export {Players as PlayersEntity}

// This code only runs on the server
if (Meteor.isServer) {
    Meteor.publish('limitedPlayers', function getPlayers() {
        var sub = this;
        var handler = null;

        handler = Players.find({}, {
            // sort: {timestamp: -1},
            limit: 2
        }

        ).observeChanges({
            added: function (id, fields) {
                sub.added("2Players", id, fields);
            },
            changed: function (id, fields) {
                sub.changed("2Players", id, fields);
            },
            removed: function (id) {
                sub.removed("2Players", id);
            }
        });

        sub.ready();

        sub.onStop(function () {
            handler.stop();
        })

        // return Players.find();
    });
    Meteor.publish('get-players-by-name', function playersPublication(name) {

        var player = Players.find({ 'name': name });

        if (player) {
            return player;
        }
        return this.ready();
    });
}

if (Meteor.isClient) {
    // Meteor.subscribe('get-all-players');
    // console.log("Subscribe Complete!" + Players.find().fetch());
};
