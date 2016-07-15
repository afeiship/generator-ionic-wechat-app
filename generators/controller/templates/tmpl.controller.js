(function() {
  'use strict';

  angular
    .module('<%= projectName %>')
    .controller('<%= controllerName %>Controller', MainController);

  /** @ngInject */
  function <%= controllerName %>Controller($timeout, toastr) {
    var vm = this;
    vm.testFn = testFn();

    vm.myContent = 'I AM AUTO CREATED BY THE GENERATOR!!!';

    function testFn() {
      alert('Continue enjoy coding~');
    }
  }
})();
