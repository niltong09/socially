/**
 * Created by nilton on 16/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';

class Navigation {
}

const name = 'navigation';

// create module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    controllerAs: name,
    controller: Navigation
});
