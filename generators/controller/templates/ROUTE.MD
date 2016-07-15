##Router Snippets():
###Add index.router.js: (eg: ~/my-project/src/app/index.route.js)
```javascript
.state('<%= controller_name %>', {
        url: '/',
        templateUrl: 'app/<%= controller_name %>/<%= controllerName %>.html',
        controller: '<%= controllerName %>Controller',
        controllerAs: 'vm'
      })
```
