import fs from "fs";
import path from "path";

const srcDir = "./src";

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      const original = content;
      content = content.replace(/\.tsx(["'])/g, ".jsx$1");
      content = content.replace(/\.ts(["'])/g, ".js$1");

      if (original !== content) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  });
}

walk(srcDir);
