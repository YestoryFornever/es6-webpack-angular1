import BondDstrMainModule from './bond-dstr-main'
import BondDstrMainController from './bond-dstr-main.controller';
import BondDstrMainComponent from './bond-dstr-main.component';
import BondDstrMainTemplate from './bond-dstr-main.html';

describe('BondDstrMain', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BondDstrMainModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BondDstrMainController();
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
			expect(BondDstrMainTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BondDstrMainComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BondDstrMainTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BondDstrMainController);
			});
	});
});
