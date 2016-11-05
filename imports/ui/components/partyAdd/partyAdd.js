/**
 * Created by nilton on 09/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '../../../api/parties/index';

import { Meteor } from 'meteor/meteor';

import template from './partyAdd.html';

class PartyAdd {
    constructor() {
        this.party = {};
    }

    submit() {
        this.party.owner = Meteor.user()._id;
        Parties.insert(this.party);
        if(this.done) {
            this.done();
        }
        this.reset();
    }

    reset() {
        this.party = {};
    }
}

const name = 'partyAdd';

// create module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        done: '&?'
    },
    controllerAs: name,
    controller: PartyAdd
});
