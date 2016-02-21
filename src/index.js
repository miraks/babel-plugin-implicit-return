export default ({ types: t }) => {
  return {
    visitor: {
      Function(path) {
        const { body, directives } = path.node.body

        // function with plain directives only
        if (body.length == 0 && directives.length != 0) {
          const directive = directives.pop()
          body.push(t.returnStatement(t.stringLiteral(directive.value.value)))
          return
        }

        const lastIndex = body.length - 1
        const lastNode = body[lastIndex]

        // empty function
        if (t.isReturnStatement(lastNode)) return

        body[lastIndex] = t.returnStatement(t.toExpression(lastNode))
      }
    }
  }
}
