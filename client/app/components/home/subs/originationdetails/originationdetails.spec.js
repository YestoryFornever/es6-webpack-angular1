import OriginationdetailsModule from './originationdetails'
import OriginationdetailsController from './originationdetails.controller';
import OriginationdetailsComponent from './originationdetails.component';
import OriginationdetailsTemplate from './originationdetails.html';

describe('Originationdetails', () => {
	let $rootScope, makeController;

	beforeEach(window.module(OriginationdetailsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new OriginationdetailsController();
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
			expect(OriginationdetailsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = OriginationdetailsComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(OriginationdetailsTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(OriginationdetailsController);
			});
	});
});
