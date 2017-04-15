import ChatModelModule from './chat-model'
import ChatModelController from './chat-model.controller';
import ChatModelComponent from './chat-model.component';
import ChatModelTemplate from './chat-model.html';

describe('ChatModel', () => {
	let $rootScope, makeController;

	beforeEach(window.module(ChatModelModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new ChatModelController();
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
			expect(ChatModelTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = ChatModelComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(ChatModelTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(ChatModelController);
			});
	});
});
