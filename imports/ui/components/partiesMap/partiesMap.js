/**
 * Created by nilton on 08/10/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import 'angular-simple-logger';
import 'angular-google-maps';

import template from './partiesMap.html';

class PartiesMap {
  constructor() {
    this.map = {
      center: {
        latitude: -23.0533645,
        longitude: -51.0384213
      },
      zoom: 8
    };
  }
}

const name = 'partiesMap';

// create module
export default angular.module(name, [
  angularMeteor,
  'nemLogging',
  'uiGmapgoogle-maps'
]).component(name, {
  template,
  bindings: {
    parties: '='
  },
  controllerAs: name,
  controller: PartiesMap
});
