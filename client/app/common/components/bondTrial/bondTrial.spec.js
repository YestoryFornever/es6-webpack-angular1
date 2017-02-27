import BondTrialModule from './bondTrial'
import BondTrialController from './bondTrial.controller';
import BondTrialComponent from './bondTrial.component';
import BondTrialTemplate from './bondTrial.html';

describe('BondTrial', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BondTrialModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BondTrialController();
		};
	}));

	describe('Module', () => {
		// top-level specs: i.e., routes, injection, naming
	});

	describe('Controller', () => {
		// controller specs
		it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
			let controller = makeController();
			expect(controller).to.have.property('name');
		});
	});

	describe('Template', () => {
		// template specs
		// tip: use regex to ensure correct bindings are used e.g., {{  }}
		it('has name in template [REMOVE]', () => {
			expect(BondTrialTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BondTrialComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BondTrialTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BondTrialController);
			});
	});
});
