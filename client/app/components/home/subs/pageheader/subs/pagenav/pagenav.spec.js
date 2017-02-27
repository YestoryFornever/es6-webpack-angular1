import PagenavModule from './pagenav'
import PagenavController from './pagenav.controller';
import PagenavComponent from './pagenav.component';
import PagenavTemplate from './pagenav.html';

describe('Pagenav', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PagenavModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PagenavController();
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
      expect(PagenavTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PagenavComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PagenavTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PagenavController);
      });
  });
});
