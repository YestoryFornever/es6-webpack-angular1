import MutiSelectModule from './mutiSelect'
import MutiSelectController from './mutiSelect.controller';
import MutiSelectComponent from './mutiSelect.component';
import MutiSelectTemplate from './mutiSelect.html';

describe('MutiSelect', () => {
	let $rootScope, makeController;

	beforeEach(window.module(MutiSelectModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new MutiSelectController();
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
			expect(MutiSelectTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = MutiSelectComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(MutiSelectTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(MutiSelectController);
			});
	});
});
