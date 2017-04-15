import NewdebtinformationModule from './newdebtinformation'
import NewdebtinformationController from './newdebtinformation.controller';
import NewdebtinformationComponent from './newdebtinformation.component';
import NewdebtinformationTemplate from './newdebtinformation.html';

describe('Newdebtinformation', () => {
	let $rootScope, makeController;

	beforeEach(window.module(NewdebtinformationModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new NewdebtinformationController();
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
			expect(NewdebtinformationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = NewdebtinformationComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(NewdebtinformationTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(NewdebtinformationController);
			});
	});
});
