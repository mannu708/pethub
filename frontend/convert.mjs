import fs from "fs";
import path from "path";
import { transformSync } from "@babel/core";

const srcDir = "./src";

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      if (file.endsWith(".d.ts")) return;
      const content = fs.readFileSync(fullPath, "utf8");

      const isTsx = file.endsWith(".tsx");
      try {
        const result = transformSync(content, {
          filename: fullPath,
          presets: [
            ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
          ],
          plugins: ["@babel/plugin-syntax-jsx"],
          retainLines: true,
        });

        const newExt = isTsx ? ".jsx" : ".js";
        const newPath = fullPath.replace(/\.tsx?$/, newExt);
        fs.writeFileSync(newPath, result.code);
        console.log(`Converted ${fullPath} -> ${newPath}`);
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error processing ${fullPath}`, err);
      }
    }
  });
}

walk(srcDir);
