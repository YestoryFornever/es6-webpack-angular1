import PagefooterModule from './pagefooter'
import PagefooterController from './pagefooter.controller';
import PagefooterComponent from './pagefooter.component';
import PagefooterTemplate from './pagefooter.html';

describe('Pagefooter', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PagefooterModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PagefooterController();
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
      expect(PagefooterTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PagefooterComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PagefooterTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PagefooterController);
      });
  });
});
