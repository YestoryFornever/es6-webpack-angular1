import AlertModalModule from './alertModal'
import AlertModalController from './alertModal.controller';
import AlertModalComponent from './alertModal.component';
import AlertModalTemplate from './alertModal.html';

describe('AlertModal', () => {
	let $rootScope, makeController;

	beforeEach(window.module(AlertModalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AlertModalController();
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
			expect(AlertModalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AlertModalComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(AlertModalTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(AlertModalController);
			});
	});
});
