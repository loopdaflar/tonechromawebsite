import { cpSync, mkdirSync } from "node:fs";

// GitHub Pages answers unknown paths with a 404 status. Giving each route its
// own index.html makes direct visits return 200.
for (const route of ["support", "about", "privacy"]) {
  mkdirSync(`dist/${route}`, { recursive: true });
  cpSync("dist/index.html", `dist/${route}/index.html`);
}
