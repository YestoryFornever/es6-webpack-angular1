import countDownModule from './countDown'
import countDownController from './countDown.controller';
import countDownComponent from './countDown.component';
import countDownTemplate from './countDown.html';

describe('countDown', () => {
	let $rootScope, makeController;

	beforeEach(window.module(countDownModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new countDownController();
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
			expect(countDownTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = countDownComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(countDownTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(countDownController);
			});
	});
});
