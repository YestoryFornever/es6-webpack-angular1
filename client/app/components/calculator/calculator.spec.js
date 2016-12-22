import CalculatorModule from './calculator'
import CalculatorController from './calculator.controller';
import CalculatorComponent from './calculator.component';
import CalculatorTemplate from './calculator.html';

describe('Calculator', () => {
	let $rootScope, makeController;

	beforeEach(window.module(CalculatorModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new CalculatorController();
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
			expect(CalculatorTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = CalculatorComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(CalculatorTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(CalculatorController);
			});
	});
});
