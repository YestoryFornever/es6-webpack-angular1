import PagetabModule from './pagetab'
import PagetabController from './pagetab.controller';
import PagetabComponent from './pagetab.component';
import PagetabTemplate from './pagetab.html';

describe('Pagetab', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PagetabModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PagetabController();
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
      expect(PagetabTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PagetabComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PagetabTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PagetabController);
      });
  });
});
