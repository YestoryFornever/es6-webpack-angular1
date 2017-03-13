import ChangeBondModule from './changeBond'
import ChangeBondController from './changeBond.controller';
import ChangeBondComponent from './changeBond.component';
import ChangeBondTemplate from './changeBond.html';

describe('ChangeBond', () => {
	let $rootScope, makeController;

	beforeEach(window.module(ChangeBondModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ChangeBondController();
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
			expect(ChangeBondTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = ChangeBondComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(ChangeBondTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(ChangeBondController);
			});
	});
});
