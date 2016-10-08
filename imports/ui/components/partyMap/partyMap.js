/**
 * Created by nilton on 08/10/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import 'angular-simple-logger';
import 'angular-google-maps';

import './partyMap.css';
import template from './partyMap.html';

class PartyMap {
  constructor($scope) {
    'ngInject';

    this.map = {
      center: {
        latitude: -23.0533645,
        longitude: -51.0384213
      },
      zoom: 8,
      events: {
        click: (mapModel, eventName, originalEventArgs) => {
          this.setLocation(originalEventArgs[0].latLng.lat(), originalEventArgs[0].latLng.lng());
          $scope.$apply();
        }
      }
    };

    this.marker = {
      options: {
        draggable: true
      },
      events: {
        drangend: (marker, eventName, args) => {
          this.setLocation(marker.getPosition().lat(), marker.getPosition().lng());
          $scope.$apply();
        }
      }
    };
  }

  setLocation(latitude, longitude) {
    this.location = {
      latitude,
      longitude
    };
  }
}

const name = 'partyMap';

// create module
export default angular.module(name, [
  angularMeteor,
  'nemLogging',
  'uiGmapgoogle-maps'
]).component(name, {
  template,
  bindings: {
    location: '='
  },
  controllerAs: name,
  controller: PartyMap
});
