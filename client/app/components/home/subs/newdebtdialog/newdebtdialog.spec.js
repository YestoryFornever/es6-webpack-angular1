import NewdebtdialogModule from './newdebtdialog'
import NewdebtdialogController from './newdebtdialog.controller';
import NewdebtdialogComponent from './newdebtdialog.component';
import NewdebtdialogTemplate from './newdebtdialog.html';

describe('Newdebtdialog', () => {
	let $rootScope, makeController;

	beforeEach(window.module(NewdebtdialogModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new NewdebtdialogController();
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
			expect(NewdebtdialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = NewdebtdialogComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(NewdebtdialogTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(NewdebtdialogController);
			});
	});
});
