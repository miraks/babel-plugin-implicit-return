export default ({ types: t }) => {
  const unreturnableStatements = new Set(["DebuggerStatement", "WithStatement", "ReturnStatement", "LabeledStatement",
    "BreakStatement", "ContinueStatement", "ThrowStatement"])

  const last = (array) => array[array.length - 1]

  const lastNotEmptyIndex = (nodes) => {
    return nodes.reverse().findIndex((node) => !t.isEmptyStatement(node))
  }

  // like babel-types#toExpression, but preserves function expressions
  const toExpression = (node) => {
    if (t.isExpressionStatement(node)) node = node.expression

    if (t.isClass(node)) {
      node.type = "ClassExpression"
    } else if (t.isFunctionDeclaration(node)) {
      node.type = "FunctionExpression"
    }

    if (t.isExpression(node)) return node
    throw new Error(`cannot turn ${node.type} to an expression`)
  }

  return {
    visitor: {
      Function({ node }) {
        // arrow function expression
        if (node.expression) return

        const { body, directives } = node.body

        if (body.length == 0) {
          // empty function
          if (directives.length == 0) return

          // function with directives only
          const directive = directives.pop()
          body.push(t.returnStatement(t.stringLiteral(directive.value.value)))
          return
        }

        const lastIndex = lastNotEmptyIndex(body)
        const lastNode = body[lastIndex]

        // skip unreturnable statements
        if (unreturnableStatements.has(lastNode.type)) return

        // variables declaration
        if (t.isVariableDeclaration(lastNode)) {
          const declaration = last(lastNode.declarations)
          body.push(t.returnStatement(declaration.id))
          return
        }

        body[lastIndex] = t.returnStatement(toExpression(lastNode))
      }
    }
  }
}
