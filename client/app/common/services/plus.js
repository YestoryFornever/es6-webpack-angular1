import angular from 'angular';
import plus from './plus.service';

let plusModule = angular.module('plus', [])
.service('plus',plus)
.name;

export default plusModule;