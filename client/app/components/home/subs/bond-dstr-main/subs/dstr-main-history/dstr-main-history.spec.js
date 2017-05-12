import DstrMainHistoryModule from './dstr-main-history'
import DstrMainHistoryController from './dstr-main-history.controller';
import DstrMainHistoryComponent from './dstr-main-history.component';
import DstrMainHistoryTemplate from './dstr-main-history.html';

describe('DstrMainHistory', () => {
	let $rootScope, makeController;

	beforeEach(window.module(DstrMainHistoryModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new DstrMainHistoryController();
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
			expect(DstrMainHistoryTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = DstrMainHistoryComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(DstrMainHistoryTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(DstrMainHistoryController);
			});
	});
});
