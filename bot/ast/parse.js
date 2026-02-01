import fs from "fs";
import parser from "@babel/parser";

export function parseFile(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");

  return parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
}
