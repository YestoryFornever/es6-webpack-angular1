import BackgroundsystemModule from './backgroundsystem'
import BackgroundsystemController from './backgroundsystem.controller';
import BackgroundsystemComponent from './backgroundsystem.component';
import BackgroundsystemTemplate from './backgroundsystem.html';

describe('Backgroundsystem', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BackgroundsystemModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BackgroundsystemController();
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
			expect(BackgroundsystemTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BackgroundsystemComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BackgroundsystemTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BackgroundsystemController);
			});
	});
});
