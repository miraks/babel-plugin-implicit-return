"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(_ref) {
  var t = _ref.types;
  var unreturnableStatements = new Set(["DebuggerStatement", "WithStatement", "ReturnStatement", "LabeledStatement", "BreakStatement", "ContinueStatement", "ThrowStatement"]);
  var returnableStatements = new Set(["IfStatement", "SwitchStatement", "TryStatement", "WhileStatement", "DoWhileStatement", "ForStatement", "ForInStatement", "ForOfStatement"]);

  var last = function last(array) {
    return array[array.length - 1];
  };

  var lastNotEmptyIndex = function lastNotEmptyIndex(nodes) {
    for (var index = nodes.length - 1; index >= 0; index -= 1) {
      if (!t.isEmptyStatement(nodes[index])) return index;
    }
  }; // like babel-types#toExpression, but preserves function expressions


  var toExpression = function toExpression(node) {
    if (t.isExpressionStatement(node)) node = node.expression;

    if (t.isClass(node)) {
      node.type = "ClassExpression";
    } else if (t.isFunctionDeclaration(node)) {
      node.type = "FunctionExpression";
    }

    if (t.isExpression(node)) return node;
    throw new Error("cannot turn ".concat(node.type, " to an expression"));
  };

  return {
    visitor: {
      Function: function Function(path) {
        var node = path.node; // arrow function expression

        if (node.expression) return;
        var _node$body = node.body,
            body = _node$body.body,
            directives = _node$body.directives;

        try {
          if (body.length === 0) {
            // empty function
            if (directives.length === 0) return; // function with directives only

            var directive = directives.pop();
            body.push(t.returnStatement(t.stringLiteral(directive.value.value)));
            return;
          }
        } catch (error) {
          return;
        }

        var lastIndex = lastNotEmptyIndex(body);
        var lastPath = path.get("body.body.".concat(lastIndex));
        var lastNode = body[lastIndex]; // skip unreturnable statements

        try {
          if (unreturnableStatements.has(lastNode.type)) return;
        } catch (error) {
          return;
        } // convert returnable statements


        if (returnableStatements.has(lastNode.type)) {
          var completionRecords = lastPath.getCompletionRecords();
          var returnUid = null;
          completionRecords.forEach(function (subPath) {
            if (!subPath.isExpressionStatement()) return;
            var isLoop = subPath.findParent(function (subPath) {
              return subPath.isLoop();
            });

            if (isLoop) {
              if (!returnUid) returnUid = path.scope.generateDeclaredUidIdentifier("ret");
              subPath.get("expression").replaceWith(t.assignmentExpression("=", returnUid, subPath.node.expression));
            } else {
              subPath.replaceWith(t.returnStatement(subPath.node.expression));
            }
          });

          if (returnUid) {
            path.get("body").pushContainer("body", t.returnStatement(returnUid));
          }

          return;
        } // variables declaration


        if (t.isVariableDeclaration(lastNode)) {
          var _last = last(lastNode.declarations),
              id = _last.id;

          if (t.isArrayPattern(id)) {
            id = last(id.elements).argument;
          }

          if (t.isObjectPattern(id)) {
            id = last(id.properties).argument;
          }

          body.push(t.returnStatement(id));
          return;
        }

        body[lastIndex] = t.returnStatement(toExpression(lastNode));
      }
    }
  };
};

exports.default = _default;
