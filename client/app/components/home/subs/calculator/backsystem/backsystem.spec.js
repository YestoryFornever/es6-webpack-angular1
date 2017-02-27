import BacksystemModule from './backsystem'
import BacksystemController from './backsystem.controller';
import BacksystemComponent from './backsystem.component';
import BacksystemTemplate from './backsystem.html';

describe('Backsystem', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BacksystemModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BacksystemController();
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
			expect(BacksystemTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BacksystemComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BacksystemTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BacksystemController);
			});
	});
});
