import BondquotationModule from './bondquotation'
import BondquotationController from './bondquotation.controller';
import BondquotationComponent from './bondquotation.component';
import BondquotationTemplate from './bondquotation.html';

describe('Bondquotation', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BondquotationModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BondquotationController();
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
			expect(BondquotationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BondquotationComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BondquotationTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BondquotationController);
			});
	});
});
