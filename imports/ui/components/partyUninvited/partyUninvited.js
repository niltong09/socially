/**
 * Created by nilton on 03/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { name as UninvitedFilter } from '../../filters/uninvitedFilter';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';

import template from './partyUninvited.html';

class PartyUninvited {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
    this.subscribe('users');

    this.helpers({
      users() {
        return Meteor.users.find({});
      }
    });
  }

  invite(user) {
    Meteor.call('invite', this.party._id, user._id,
      (error) => {
        if (error) {
          console.log('Oops, unable to invite!');
        } else {
          console.log('Invited!');
        }
      });
  }
}

const name = 'partyUninvited';

// create module
export default angular.module(name, [
  angularMeteor,
  UninvitedFilter,
  DisplayNameFilter
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    party: '<'
  },
  controller: PartyUninvited
});
