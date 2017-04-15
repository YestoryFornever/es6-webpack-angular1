import PubReportDialogModule from './pub-report-dialog'
import PubReportDialogController from './pub-report-dialog.controller';
import PubReportDialogComponent from './pub-report-dialog.component';
import PubReportDialogTemplate from './pub-report-dialog.html';

describe('PubReportDialog', () => {
	let $rootScope, makeController;

	beforeEach(window.module(PubReportDialogModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new PubReportDialogController();
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
			expect(PubReportDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = PubReportDialogComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(PubReportDialogTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(PubReportDialogController);
			});
	});
});
