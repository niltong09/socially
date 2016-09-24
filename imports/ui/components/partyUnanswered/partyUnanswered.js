/**
 * Created by nilton on 10/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import { Meteor } from 'meteor/meteor';

import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

import template from './partyUnanswered.html';

class PartyUnanswered {
  getUnanswered() {
    if (!this.party || !this.party.invited) {
      return;
    }

    return this.party.invited.filter((user) => {
      return !_.findWhere(this.party.rsvps, { user });
    });
  }

  getUserById(userId) {
    return Meteor.users.findOne(userId)
  }
}

const name = 'partyUnanswered';

// create module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    party: '<'
  },
  controller: PartyUnanswered
});
