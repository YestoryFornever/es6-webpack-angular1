import BargainlistModule from './bargainlist'
import BargainlistController from './bargainlist.controller';
import BargainlistComponent from './bargainlist.component';
import BargainlistTemplate from './bargainlist.html';

describe('Bargainlist', () => {
	let $rootScope, makeController;

	beforeEach(window.module(BargainlistModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new BargainlistController();
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
			expect(BargainlistTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = BargainlistComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(BargainlistTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(BargainlistController);
			});
	});
});
