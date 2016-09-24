/** publish.js
 * Created by nilton on 13/08/16.
 */

import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Parties } from './collection';

if (Meteor.isServer) {
    Meteor.publish('parties', function(options, searchString) {
        const selector =
        {
            $or: [{
                $and: [{
                    public: true
                }, {
                    public: {
                        $exists: true
                    }
                }]
            }, {
                $and: [{
                    owner: this.userId
                }, {
                    owner: {
                        $exists: true
                    }
                }]
            }, {
                $and: [{
                    invited: this.userId
                }, {
                    invited: {
                        $exists: true
                    }
                }]
            }]
        };

        if (typeof searchString === 'string' && searchString.length) {
            selector.name = {
                $regex: `.*${searchString}.*`,
                $options: 'i'
            };
        }

        Counts.publish(this, 'numberOfParties', Parties.find(selector), {
            noReady: true
        });

        return Parties.find(selector,options);
    });
}
