import traverseModule from "@babel/traverse";

const traverse = traverseModule.default ?? traverseModule;
/**
 * Finds API endpoints in a file
 * Returns:
 * [
 *   { method, path, handler }
 * ]
 */
export function findApis(ast) {
  const apis = [];

  traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;

      // app.get("/path", handler)
      if (
        callee.type === "MemberExpression" &&
        callee.property.type === "Identifier" &&
        ["get", "post", "put", "delete"].includes(callee.property.name)
      ) {
        const method = callee.property.name.toUpperCase();
        const routePath = path.node.arguments[0]?.value;
        const handler = path.node.arguments[1]?.name;

        if (routePath && handler) {
          apis.push({
            method,
            path: routePath,
            handler,
          });
        }
      }
    },
  });

  return apis;
}
