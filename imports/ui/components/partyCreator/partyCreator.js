/**
 * Created by nilton on 03/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';

import template from './partyCreator.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter.js';

/**
 * PartyCreator component
 */
class PartyCreator {
  constructor($scope) {
    'ngInject';

    $scope.viewModel(this);
    this.subscribe('users');

    this.helpers({
      creator() {
        if (!this.party) {
          return '';
        }

        const owner = this.party.owner;

        if (Meteor.userId() !== null && owner === Meteor.userId()) {
          return 'me';
        }

        return Meteor.users.findOne(owner) || 'nobody';
      }
    });
  }
}

const name = 'partyCreator';

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
  controller: PartyCreator
});
