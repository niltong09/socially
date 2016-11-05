/**
 * Created by nilton on 02/07/16.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import { Parties } from '../../../api/parties/index';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import { name as PartyCreator } from '../partyCreator/partyCreator';
import { name as PartyRsvp } from '../partyRsvp/partyRsvp';
import { name as PartyRsvpsList } from '../partyRsvpsList/partyRsvpsList';
import { name as PartiesMap } from '../partiesMap/partiesMap';
import { name as PartyAddButton } from '../partyAddButton/partyAddButton';
import utilsPagination from 'angular-utils-pagination';
import { Counts } from 'meteor/tmeasday:publish-counts';


import template from './partiesList.html';
import paginationTemplate from '../../utils/paginate-dir.ng.html';

class PartiesList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };
    this.searchText = '';
    // ^([0-2][0-9]|3[01])/[01][0-9]/[0-9]{4}$

    this.subscribe('parties', () => [
      {
        limit: parseInt(this.perPage),
        skip: parseInt((this.getReactively('page') - 1) * this.perPage),
        sort: this.getReactively('sort')
      }, this.getReactively('searchText')
    ]);

    this.helpers({
      parties() {
        return Parties.find({}, {
          sort: this.getReactively('sort')
        });
      },
      partiesCount() {
        return Counts.get('numberOfParties');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      }
    });

  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }
}

const name = 'partiesList';

// create module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  PartyAdd,
  PartyRemove,
  PartiesSort,
  PartyAddButton,
  PartyRsvp,
  PartyRsvpsList,
  PartyCreator,
  PartiesMap
]).component(name, {
  template,
  controllerAs: name,
  controller: PartiesList
}).config(config);

function config($stateProvider, paginationTemplateProvider) {
  'ngInject';

  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>'
    });
  paginationTemplateProvider.setString(paginationTemplate);
}