import SendAlertModule from './sendAlert'
import SendAlertController from './sendAlert.controller';
import SendAlertComponent from './sendAlert.component';
import SendAlertTemplate from './sendAlert.html';

describe('SendAlert', () => {
	let $rootScope, makeController;

	beforeEach(window.module(SendAlertModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new SendAlertController();
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
			expect(SendAlertTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = SendAlertComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(SendAlertTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(SendAlertController);
			});
	});
});
