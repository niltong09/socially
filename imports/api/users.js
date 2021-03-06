/**
 * Created by nilton on 13/08/16.
 */

import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    Meteor.publish('users', function() {
        return Meteor.users.find({}, {
            fields: {
                emails: 1,
                profile: 1
            }
        });
    });
}