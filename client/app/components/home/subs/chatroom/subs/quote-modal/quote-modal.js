import angular from 'angular';
import uiRouter from 'angular-ui-router';
import quoteModalComponent from './quote-modal.component';
import quoteModalService from './quote-modal.service';
let quoteModalModule = angular.module('quote-modal', [
	uiRouter,
	quoteModalService
])

.component('quotemodal', quoteModalComponent)

.name;

export default quoteModalModule;
