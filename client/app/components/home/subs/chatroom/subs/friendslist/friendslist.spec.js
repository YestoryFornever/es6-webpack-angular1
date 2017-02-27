import FriendslistModule from './friendslist'
import FriendslistController from './friendslist.controller';
import FriendslistComponent from './friendslist.component';
import FriendslistTemplate from './friendslist.html';

describe('Friendslist', () => {
	let $rootScope, makeController;

	beforeEach(window.module(FriendslistModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new FriendslistController();
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
			expect(FriendslistTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = FriendslistComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(FriendslistTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(FriendslistController);
			});
	});
});
