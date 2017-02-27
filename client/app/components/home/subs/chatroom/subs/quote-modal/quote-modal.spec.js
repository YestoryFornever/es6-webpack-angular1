import Quote-modalModule from './quote-modal'
import Quote-modalController from './quote-modal.controller';
import Quote-modalComponent from './quote-modal.component';
import Quote-modalTemplate from './quote-modal.html';

describe('Quote-modal', () => {
	let $rootScope, makeController;

	beforeEach(window.module(Quote-modalModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new Quote-modalController();
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
			expect(Quote-modalTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = Quote-modalComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(Quote-modalTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(Quote-modalController);
			});
	});
});
