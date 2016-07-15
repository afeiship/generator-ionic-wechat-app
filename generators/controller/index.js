'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var ejs = require('ejs');
var _ = require('underscore');
var rExt = /^\.(js|json|scss|sass|css|html|md)$/i;


module.exports = yeoman.Base.extend({
  prompting: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the delightful ' + chalk.red('generator-test-yo') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project_name',
      store: true,
      default: function() {
        var cwd = path.basename(process.cwd());
        var result = cwd.split(/[-_]/);
        return result.join('-');
      }
    }, {
      type: 'input',
      name: 'controller_name',
      message: 'Your controller_name (eg:user/user-list)?'
    }];

    return this.prompt(prompts).then(function(props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function() {
    this._rewriteProps();
    this._copyRouteSinppets();
    this._copyCtrlJS();
    this._copyCtrlScss();
    this._copyCtrlHtml();
  },
  _copyRouteSinppets: function() {
    this.fs.copyTpl(
      this.templatePath('ROUTE.MD'),
      this.destinationPath('src/app/' + this._ctrlName + '/ROUTE.MD'),
      this.props
    );
  },
  _copyCtrlJS: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.controller.js'),
      this.destinationPath('src/app/' + this._ctrlName + '/' + this._ctrlName + '.controller.js'),
      this.props
    );
  },
  _copyCtrlScss: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.scss'),
      this.destinationPath('src/app/' + this._ctrlName + '/' + this._ctrlName + '.scss'),
      this.props
    );
  },
  _copyCtrlHtml: function() {
    this.fs.copyTpl(
      this.templatePath('tmpl.html'),
      this.destinationPath('src/app/' + this._ctrlName + '/' + this._ctrlName + '.html'),
      this.props
    );
  },
  _rewriteProps: function() {
    var props = this.props;
    this._ctrlName = this.props['controller_name'];
    _.each(props, function(prop, key) {
      this.props[this._camelCase(key)] = this._camelCase(prop);
    }, this);
  },
  _camelCase: function(inString) {
    return inString.replace(/[_-]\D/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  },
  install: function() {
    console.log('install dependencies....');
    this.installDependencies();
  },
  end: function() {
    console.log('Enjoy coding~ :)');
  }
});
