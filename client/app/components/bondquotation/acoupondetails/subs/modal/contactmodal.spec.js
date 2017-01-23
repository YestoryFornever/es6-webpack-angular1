import ContactmodalModule from './contactmodal'
import ContactmodalController from './contactmodal.controller';
import ContactmodalComponent from './contactmodal.component';
import ContactmodalTemplate from './contactmodal.html';

describe('Contactmodal', () => {
	let $rootScope, makeController;

	beforeEach(window.module(ContactmodalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ContactmodalController();
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
			expect(ContactmodalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = ContactmodalComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(ContactmodalTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(ContactmodalController);
			});
	});
});
