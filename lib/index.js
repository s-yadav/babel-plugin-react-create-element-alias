"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  var nestedProgramVisitor = {
    Identifier: function Identifier(path) {
      if (path.node.name === aliasName) {
        path.scope.rename(aliasName);
      }
    }
  };

  return {
    visitor: {
      /** Rename aliasName name if used anywhere **/
      Program: function Program(path) {
        path.traverse(nestedProgramVisitor);
      },

      /** Add alias and replace React.createElement with alias **/
      CallExpression: function CallExpression(path) {
        var callee = path.node.callee;
        var scope = path.scope;

        if (t.isMemberExpression(callee) && callee.object.name === 'React' && callee.property.name === 'createElement') {
          var newIdentifier = t.identifier(aliasName);
          path.node.callee = newIdentifier;
          addAlias(scope);
        }
      }
    }
  };
};

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTemplate = require("babel-template");

var template = _interopRequireWildcard(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var aliasName = '_rce';

function createAliasDeclaration(scope) {
  var identifier = t.identifier(aliasName);
  var expression = t.memberExpression(t.identifier('React'), t.identifier('createElement'));
  return t.variableDeclaration('var', [t.variableDeclarator(identifier, expression)]);
}

function addAlias(scope) {
  var ReactBinding = scope.getBinding('React');
  var ReactNodePath = ReactBinding.path;

  if (ReactNodePath.addedAlias) return;

  var blockPath = ReactNodePath.find(function (path) {
    return path.isBlockStatement() || path.isProgram();
  });
  var scopeBody = blockPath.node.body;
  var variableDeclaration = createAliasDeclaration(scope);
  variableDeclaration.isAliasedReactCreateElement = true;

  if (ReactBinding.kind === 'param' || ReactNodePath.parentKey === 'params') {
    var firstStatementPathOnScope = ReactNodePath.parentPath.get('body.body.0');
    var insertPosition = firstStatementPathOnScope.isVariableDeclaration() ? 'insertAfter' : 'insertBefore';
    firstStatementPathOnScope[insertPosition](variableDeclaration);
  } else {
    var identifier = t.identifier(aliasName);
    var expression = t.memberExpression(t.identifier('React'), t.identifier('createElement'));

    //ReactBinding.scope.push({id: identifier, init: expression});
    ReactNodePath.parentPath.insertAfter(variableDeclaration);
  }

  ReactNodePath.addedAlias = true;
}