import AcoupondModule from './acoupond'
import AcoupondController from './acoupond.controller';
import AcoupondComponent from './acoupond.component';
import AcoupondTemplate from './acoupond.html';

describe('Acoupond', () => {
	let $rootScope, makeController;

	beforeEach(window.module(AcoupondModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new AcoupondController();
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
			expect(AcoupondTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = AcoupondComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(AcoupondTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(AcoupondController);
			});
	});
});
