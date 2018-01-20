import * as babylon from "babylon";
import * as template from "babel-template";
import * as t from 'babel-types';

const aliasName = '_rce';

function createAliasDeclaration (scope) {
  const identifier = t.identifier(aliasName);
  const expression = t.memberExpression(t.identifier('React'), t.identifier('createElement'));
  return t.variableDeclaration('var', [t.variableDeclarator(identifier, expression)]);
}

function addAlias(scope) {
  const ReactBinding = scope.getBinding('React');
  const ReactNodePath = ReactBinding.path;

  if (ReactNodePath.addedAlias) return;

  const blockPath = ReactNodePath.find(path => path.isBlockStatement() || path.isProgram());
  const scopeBody = blockPath.node.body;
  const variableDeclaration = createAliasDeclaration(scope);
  variableDeclaration.isAliasedReactCreateElement = true;

  if (ReactBinding.kind === 'param' || ReactNodePath.parentKey === 'params') {
    const firstStatementPathOnScope = ReactNodePath.parentPath.get('body.body.0');
    const insertPosition = firstStatementPathOnScope.isVariableDeclaration() ? 'insertAfter' : 'insertBefore';
    firstStatementPathOnScope[insertPosition](variableDeclaration);
  } else {
    const identifier = t.identifier(aliasName);
    const expression = t.memberExpression(t.identifier('React'), t.identifier('createElement'));

    //ReactBinding.scope.push({id: identifier, init: expression});
    ReactNodePath.parentPath.insertAfter(variableDeclaration);
  }

  ReactNodePath.addedAlias = true;
}



export default function() {

  const nestedProgramVisitor = {
    Identifier(path) {
      if (path.node.name === aliasName) {
        path.scope.rename(aliasName);
      }
    }
  }

  return {
    visitor: {
      /** Rename aliasName name if used anywhere **/
      Program(path) {
        path.traverse(nestedProgramVisitor);
      },
      /** Add alias and replace React.createElement with alias **/
      CallExpression(path) {
        const {callee} = path.node;
        const {scope} = path;
        if (t.isMemberExpression(callee) && callee.object.name === 'React' && callee.property.name === 'createElement') {
          const newIdentifier = t.identifier(aliasName);
          path.node.callee = newIdentifier;
          addAlias(scope);
        }
      }
    }
  }
}
