import nowBondModule from './nowBond'
import nowBondController from './nowBond.controller';
import nowBondComponent from './nowBond.component';
import nowBondTemplate from './nowBond.html';

describe('nowBond', () => {
	let $rootScope, makeController;

	beforeEach(window.module(nowBondModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new nowBondController();
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
			expect(nowBondTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = nowBondComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(nowBondTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(nowBondController);
			});
	});
});
