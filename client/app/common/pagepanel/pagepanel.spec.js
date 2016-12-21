import PagepanelModule from './pagepanel'
import PagepanelController from './pagepanel.controller';
import PagepanelComponent from './pagepanel.component';
import PagepanelTemplate from './pagepanel.html';

describe('Pagepanel', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PagepanelModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PagepanelController();
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
      expect(PagepanelTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PagepanelComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PagepanelTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PagepanelController);
      });
  });
});
