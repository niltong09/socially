/**
 * auth - Arquivo que fica o <codigo>
 *
 * Homepage         : http://www.saerp.com.br
 * Autor            : Nilton Gabriel Bueno Pires <g@saerp.com.br>
 * Data de criação  : 04/11/16
 *
 * -----------------------------------------------------------------------------
 * <descricao-longa>
 * -----------------------------------------------------------------------------
 *
 * Histórico:
 *  0.01 04/11/16, Nilton Gabriel Bueno Pires:
 *      - <lista-de-feitos>
 *
 * COPYRIGHT: Todos os direitos reservados a SAERP Tecnologia e Soluções LTDA.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './auth.html';
import { name as DisplayNameFilter } from '../../filters/displayNameFilter';
import { name as Login } from '../login/login';
import { name as Register } from '../register/register';
import { name as Password } from '../password/password';

const name = 'auth';

class Auth {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.helpers({
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUser() {
        return Meteor.user();
      }
    });
  }

  logout() {
    Accounts.logout();
  }
}

// create a module
export default angular.module(name, [
  angularMeteor,
  DisplayNameFilter,
  Login,
  Register,
  Password
]).component(name, {
  template,
  controllerAs: name,
  controller: Auth
});
