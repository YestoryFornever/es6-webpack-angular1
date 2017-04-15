import NewdebtinformationdetailsModule from './newdebtinformationdetails'
import NewdebtinformationdetailsController from './newdebtinformationdetails.controller';
import NewdebtinformationdetailsComponent from './newdebtinformationdetails.component';
import NewdebtinformationdetailsTemplate from './newdebtinformationdetails.html';

describe('Newdebtinformationdetails', () => {
	let $rootScope, makeController;

	beforeEach(window.module(NewdebtinformationdetailsModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new NewdebtinformationdetailsController();
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
			expect(NewdebtinformationdetailsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AcoupondetailsComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(NewdebtinformationdetailsTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(NewdebtinformationdetailsController);
			});
	});
});
