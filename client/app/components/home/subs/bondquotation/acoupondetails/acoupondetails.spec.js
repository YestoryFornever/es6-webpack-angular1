import AcoupondetailsModule from './acoupondetails'
import AcoupondetailsController from './acoupondetails.controller';
import AcoupondetailsComponent from './acoupondetails.component';
import AcoupondetailsTemplate from './acoupondetails.html';

describe('Acoupondetails', () => {
	let $rootScope, makeController;

	beforeEach(window.module(AcoupondetailsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AcoupondetailsController();
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
			expect(AcoupondetailsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AcoupondetailsComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(AcoupondetailsTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(AcoupondetailsController);
			});
	});
});
