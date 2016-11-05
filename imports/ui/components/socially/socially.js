/**
 * Created by nilton on 09/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';

import template from './socially.html';
import { name as PartiesList } from '../partiesList/partiesList';
import { name as Navigation } from '../navigation/navigation';
import { name as PartyDetails } from '../partyDetails/partyDetails';
import { name as Auth } from '../auth/auth';

class Socially {}

const name = 'socially';

// create module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    PartiesList,
    PartyDetails,
    Navigation,
    'accounts.ui',
  Auth,
  ngMaterial
]).component(name, {
    template,
    controllerAs: name,
    controller: Socially
}).config(config)
    .run(run);

function config($locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $mdIconProvider) {
    'ngInject';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/parties');
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyAwyVX6Vwb8tkPWQaoTQvAgk4jvFROT-yE'
    });

    const iconPath =  '/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/';

    $mdIconProvider
      .iconSet('social',
        iconPath + 'svg-sprite-social.svg')
      .iconSet('action',
        iconPath + 'svg-sprite-action.svg')
      .iconSet('communication',
        iconPath + 'svg-sprite-communication.svg')
      .iconSet('content',
        iconPath + 'svg-sprite-content.svg')
      .iconSet('toggle',
        iconPath + 'svg-sprite-toggle.svg')
      .iconSet('navigation',
        iconPath + 'svg-sprite-navigation.svg')
      .iconSet('image',
        iconPath + 'svg-sprite-image.svg');
}

function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('parties');
            }
        }
    );
}