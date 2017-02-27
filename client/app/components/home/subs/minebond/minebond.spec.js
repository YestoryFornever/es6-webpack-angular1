import MinebondModule from './minebond'
import MinebondController from './minebond.controller';
import MinebondComponent from './minebond.component';
import MinebondTemplate from './minebond.html';

describe('Minebond', () => {
	let $rootScope, makeController;

	beforeEach(window.module(MinebondModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new MinebondController();
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
			expect(MinebondTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = MinebondComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(MinebondTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(MinebondController);
			});
	});
});
