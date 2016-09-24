/**
 * Created by nilton on 10/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partyRsvp.html';

class PartyRsvp {
  yes() {
    this.answer('yes');
  }

  maybe() {
    this.answer('maybe');
  }

  no() {
    this.answer('no');
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
