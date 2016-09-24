/**
 * Created by nilton on 09/07/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Parties } from '../../../api/parties/index';

import template from './partyRemove.html';

class PartyRemove {
    remove() {
        Parties.remove(this.party._id);
    }
}

const name = 'partyRemove';

// create module
export default angular.module(name, [
    angularMeteor
]).component(name, {
    template,
    bindings: {
        party: '<'
    },
    controllerAs: name,
    controller: PartyRemove
});
