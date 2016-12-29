import UiModule from './ui'
import UiController from './ui.controller';
import UiComponent from './ui.component';
import UiTemplate from './ui.html';

describe('Ui', () => {
	let $rootScope, makeController;

	beforeEach(window.module(UiModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new UiController();
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
			expect(UiTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = UiComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(UiTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(UiController);
			});
	});
});
