import PageheaderModule from './pageheader'
import PageheaderController from './pageheader.controller';
import PageheaderComponent from './pageheader.component';
import PageheaderTemplate from './pageheader.html';

describe('Pageheader', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PageheaderModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PageheaderController();
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
      expect(PageheaderTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PageheaderComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PageheaderTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PageheaderController);
      });
  });
});
