import traverseModule from "@babel/traverse";

const traverse = traverseModule.default ?? traverseModule;

/**
 * Builds a call graph:
 * {
 *   functionName: {
 *     callers: Set(),
 *     callees: Set()
 *   }
 * }
 */
export function buildCallGraph(ast) {
  const graph = new Map();
  let currentFunction = null;

  traverse(ast, {
    // Track which function we're inside
    FunctionDeclaration: {
      enter(path) {
        const name = path.node.id?.name;
        if (!name) return;

        currentFunction = name;
        if (!graph.has(name)) {
          graph.set(name, {
            callers: new Set(),
            callees: new Set(),
          });
        }
      },
      exit() {
        currentFunction = null;
      },
    },

    // Track function calls
    CallExpression(path) {
      if (!currentFunction) return;

      const callee = path.node.callee;

      // Only handle simple calls: foo()
      if (callee.type === "Identifier") {
        const calleeName = callee.name;

        if (!graph.has(calleeName)) {
          graph.set(calleeName, {
            callers: new Set(),
            callees: new Set(),
          });
        }

        graph.get(currentFunction).callees.add(calleeName);
        graph.get(calleeName).callers.add(currentFunction);
      }
    },
  });

  return graph;
}
