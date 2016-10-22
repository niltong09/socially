/**
 * Created by nilton on 10/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import _ from 'underscore';

import template from './partyRsvp.html';

class PartyRsvp {
  yes() {
    this.answer('yes');
  }
  isYes() {
    return this.isAnswer('yes');
  }

  maybe() {
    this.answer('maybe');
  }
  isMaybe() {
    return this.isAnswer('maybe');
  }

  no() {
    this.answer('no');
  }
  isNo() {
    return this.isAnswer('no');
  }

  answer(answer) {
    Meteor.call('rsvp', this.party._id, answer, (error) => {
      if(error) {
        console.error('Oops, unable to rsvp!');
      } else {
        console.log('RSVP done!');
      }
    });
  }

  isAnswer(answer) {
    if (this.party) {
      return !!_.findWhere(this.party.rsvps, {
        user: Meteor.userId(),
        rsvp: answer
      });
    }
  }
}

const name = 'partyRsvp';

// create module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    party: '<'
  },
  controller: PartyRsvp
});
