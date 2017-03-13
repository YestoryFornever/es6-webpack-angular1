import angular from 'angular';
import uiRouter from 'angular-ui-router';
import quoteModalComponent from './quote-modal.component';
import quoteModalService from './quote-modal.service';
import nowBondComponent from '../../../nowBond/nowBond';
let quoteModalModule = angular.module('quote-modal', [
	uiRouter,
	quoteModalService,
	nowBondComponent
])

.component('quotemodal', quoteModalComponent)

.name;

export default quoteModalModule;
