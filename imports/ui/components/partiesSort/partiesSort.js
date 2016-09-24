/**
 * Created by nilton on 27/08/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './partiesSort.html';

class PartiesSort {
    constructor() {
        this.changed();
    }

    changed() {
        this.onChange({
            sort: {
                [this.property]: parseInt(this.order)
            }
        });
    }
}

const name = 'partiesSort';

// create module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: name,
    controller: PartiesSort
});
