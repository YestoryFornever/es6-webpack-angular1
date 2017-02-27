import CashofferModule from './cashoffer'
import CashofferController from './cashoffer.controller';
import CashofferComponent from './cashoffer.component';
import CashofferTemplate from './cashoffer.html';

describe('Cashoffer', () => {
	let $rootScope, makeController;

	beforeEach(window.module(CashofferModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new CashofferController();
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
			expect(CashofferTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = CashofferComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(CashofferTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(CashofferController);
			});
	});
});
