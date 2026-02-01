import { execSync } from "child_process";

export function getChangedFiles() {
  let diffCommand;

  if (process.env.GITHUB_BASE_REF) {
    // GitHub Actions (PR context)
    diffCommand = `git diff --name-only origin/${process.env.GITHUB_BASE_REF}...HEAD`;
  } else {
    // Local development fallback
    diffCommand = `git diff --name-only HEAD~1`;
  }

  const output = execSync(diffCommand, { encoding: "utf-8" });

  return output
    .split("\n")
    .filter(Boolean)
    .filter(f => f.endsWith(".ts") || f.endsWith(".js"));
}
