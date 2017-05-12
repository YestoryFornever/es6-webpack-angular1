import uploadImgModule from './uploadimg'
import uploadImgController from './uploadimg.controller';
import uploadImgComponent from './uploadimg.component';
import uploadImgTemplate from './uploadimg.html';

describe('uploadImg', () => {
	let $rootScope, makeController; 

	beforeEach(window.module(uploadImgModule));
	beforeEach(inject((_$rootScope_) => {
		$rootScope = _$rootScope_;
		makeController = () => {
			return new uploadImgController();
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
			expect(uploadImgTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
		});
	});

	describe('Component', () => {
			// component/directive specs
			let component = uploadImgComponent;

			it('includes the intended template',() => {
				expect(component.template).to.equal(uploadImgTemplate);
			});

			it('invokes the right controller', () => {
				expect(component.controller).to.equal(uploadImgController);
			});
	});
});
