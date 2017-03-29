import MessagedetailModule from './messagedetail'
import MessagedetailController from './messagedetail.controller';
import MessagedetailComponent from './messagedetail.component';
import MessagedetailTemplate from './messagedetail.html';

describe('messagedetail', () => {
	let $rootScope, makeController;

	beforeEach(window.module(MessagedetailModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new MessagedetailController();
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
			expect(MessagedetailTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = MessagedetailComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(MessagedetailTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(MessagedetailController);
			});
	});
});
