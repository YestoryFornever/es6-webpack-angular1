import GroupslistModule from './groupslist'
import GroupslistController from './groupslist.controller';
import GroupslistComponent from './groupslist.component';
import GroupslistTemplate from './groupslist.html';

describe('Groupslist', () => {
	let $rootScope, makeController;

	beforeEach(window.module(GroupslistModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new GroupslistController();
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
			expect(GroupslistTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = GroupslistComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(GroupslistTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(GroupslistController);
			});
	});
});
