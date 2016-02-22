const last = (array) => array[array.length - 1]

export default ({ types: t }) => {
  return {
    visitor: {
      Function(path) {
        const { body, directives } = path.node.body

        if (body.length == 0) {
          if (directives.length == 0) return

          // function with directives only
          const directive = directives.pop()
          body.push(t.returnStatement(t.stringLiteral(directive.value.value)))
          return
        }

        const lastIndex = body.length - 1
        const lastNode = last(body)

        // empty function
        if (t.isReturnStatement(lastNode)) return

        // variable declaration
        if (t.isVariableDeclaration(lastNode)) {
          const declaration = last(lastNode.declarations)
          body.push(t.returnStatement(declaration.id))
          return
        }

        body[lastIndex] = t.returnStatement(t.toExpression(lastNode))
      }
    }
  }
}
