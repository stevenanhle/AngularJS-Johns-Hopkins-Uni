(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'allCategories.template.html',
  bindings: {
    categories: '<'
  }
  // vao day gap allCategories.template.html
});

})();
