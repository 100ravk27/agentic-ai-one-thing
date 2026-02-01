import { getChangedFiles } from "./git/diff.js";
import { parseFile } from "./ast/parse.js";
import { buildCallGraph } from "./ast/callGraph.js";
import { findApis } from "./ast/apiFinder.js";

function run() {
  const changedFiles = getChangedFiles();
  console.log("Changed files:", changedFiles);

  for (const file of changedFiles) {
    const ast = parseFile(file);
    const graph = buildCallGraph(ast);
    const apis = findApis(ast);

    console.log(`\nCall graph for ${file}:`);
    for (const [fn, links] of graph.entries()) {
      console.log(`- ${fn}`);
      console.log(`   calls:   ${[...links.callees].join(", ")}`);
      console.log(`   called by: ${[...links.callers].join(", ")}`);
    }

    if (apis.length) {
      console.log(`\nAPIs found in ${file}:`);
      for (const api of apis) {
        console.log(`- ${api.method} ${api.path} → ${api.handler}`);
      }
    }
  }
}

run();
