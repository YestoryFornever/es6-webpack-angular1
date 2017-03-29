import InputNumModule from './inputNum'
import InputNumController from './inputNum.controller';
import InputNumComponent from './inputNum.component';
import InputNumTemplate from './inputNum.html';

describe('InputNum', () => {
	let $rootScope, makeController;

	beforeEach(window.module(InputNumModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new InputNumController();
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
			expect(InputNumTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = InputNumComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(InputNumTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(InputNumController);
			});
	});
});
