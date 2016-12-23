import angular from 'angular';
import checkmarkfilter from './checkmark.filter';

let checkmarkFilterModule = angular.module('checkmark', [])
.filter('checkmark',checkmarkfilter)
.name;

export default checkmarkFilterModule;