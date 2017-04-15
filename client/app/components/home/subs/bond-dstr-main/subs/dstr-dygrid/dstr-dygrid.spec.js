import DstrDygridModule from './dstr-dygrid'
import DstrDygridController from './dstr-dygrid.controller';
import DstrDygridComponent from './dstr-dygrid.component';
import DstrDygridTemplate from './dstr-dygrid.html';

describe('DstrDygrid', () => {
	let $rootScope, makeController;

	beforeEach(window.module(DstrDygridModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new DstrDygridController();
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
			expect(DstrDygridTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = DstrDygridComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(DstrDygridTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(DstrDygridController);
			});
	});
});
