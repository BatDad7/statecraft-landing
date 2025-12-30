import fs from "fs";
import path from "path";

function listTsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listTsxFiles(full));
    else if (entry.isFile() && full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

describe("Higher Ed pages must not import AP-only landing components", () => {
  test("app/higher-ed/**/* does not import '@/components/landing/*'", () => {
    const root = path.join(process.cwd(), "app", "higher-ed");
    const files = listTsxFiles(root);
    const offenders: string[] = [];

    for (const f of files) {
      const src = fs.readFileSync(f, "utf8");
      if (src.includes('from "@/components/landing/')) {
        offenders.push(path.relative(process.cwd(), f));
      }
    }

    expect(offenders).toEqual([]);
  });
});


