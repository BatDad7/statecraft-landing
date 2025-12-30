import fs from "fs";
import path from "path";

function read(relPath: string) {
  return fs.readFileSync(path.join(process.cwd(), relPath), "utf8");
}

describe("Higher Ed pages should not render a second Navbar", () => {
  test("app/higher-ed/page.tsx does not import Navbar or render <Navbar", () => {
    const src = read("app/higher-ed/page.tsx");
    expect(src).not.toMatch(/from\s+["']@\/components\/Navbar["']/);
    expect(src).not.toMatch(/<Navbar\\b/);
  });
});


