/**
 * Created by nilton on 16/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import { Parties } from '../../../api/parties/index';
import { name as PartyUninvited } from '../partyUninvited/partyUninvited';

import template from './partyDetails.html';


class PartyDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.subscribe('parties');
    this.subscribe('users');

    this.partyId = $stateParams.partyId;

    this.helpers({
      party() {
        return Parties.findOne({_id: this.partyId});
      },
      users() {
        return Meteor.users.find({});
      },
      isLoggedIn() {
        return !!Meteor.userId();
      }
    });
  }

  save() {
    Parties.update(
      {
        _id: this.party._id
      }, {
        $set: {
          name: this.party.name,
          description: this.party.description,
          public: this.party.public
        }
      }, (error) => {
        if (error) {
          console.log('Oops, unable to update the party...');
        } else {
          console.log('Done!');
        }
      }
    );
  }

  canInvite() {
    if (!this.party) {
      return false;
    }

    return !this.party.public && this.party.owner === Meteor.userId();
  }
}

const name = 'partyDetails';

// create module
export default angular.module(name, [
  angularMeteor,
  PartyUninvited,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: PartyDetails
}).config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('partyDetails', {
    url: '/parties/:partyId',
    template: '<party-details></party-details>',
    resolve: {
      currentUser($q) {
        if (Meteor.userId() === null) {
          //return $q.reject('AUTH_REQUIRED');
          return $q.resolve();
        } else {
          return $q.resolve();
        }
      }
    }
  });
}