/**
 * login - Arquivo que fica o <codigo>
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
import uiRouter from 'angular-ui-router';

import { Meteor } from 'meteor/meteor';

import template from './login.html';

import { name as Register } from '../register/register';

class Login {
  constructor($scope, $reactive, $state) {
    'ngInject';

    this.$state = $state;

    $reactive(this).attach($scope);

    this.credentials = {
      email: '',
      password: ''
    };

    this.error = '';
  }

  login() {
    Meteor.loginWithPassword(this.credentials.email, this.credentials.password,
      this.$bindToContext((err) => {
        if (err) {
          this.error = err;
        } else {
          this.$state.go('parties');
        }
      })
    );
  }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
  ])
  .component(name, {
    template,
    controllerAs: name,
    controller: Login
  })
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
    url: '/login',
    template: '<login></login>'
  });
}
