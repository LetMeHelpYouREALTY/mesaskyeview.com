/**
 * Converts `export const metadata` to domain-aware `generateMetadata` for mesaskyeview.com.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const appDir = path.join(root, "app");

const imports = `import { getPageDomainConfig } from "@/lib/get-domain-config";
import { applyMesaskyeviewToMetadata } from "@/lib/domain-metadata";
`;

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name === "page.tsx") files.push(full);
  }
  return files;
}

for (const file of walk(appDir)) {
  let src = fs.readFileSync(file, "utf8");
  if (!src.includes("export const metadata")) continue;
  if (src.includes("applyMesaskyeviewToMetadata")) continue;

  const rel = path.relative(appDir, file).replace(/\\/g, "/");
  const pathname =
    rel === "page.tsx"
      ? "/"
      : "/" + rel.replace(/\/page\.tsx$/, "").replace(/\[id\]/g, "[id]");

  const metaMatch = src.match(/export const metadata:\s*Metadata\s*=\s*(\{[\s\S]*?\n\});/);
  if (!metaMatch) {
    console.warn("Skip (no metadata block):", file);
    continue;
  }

  const metaObject = metaMatch[1];
  const baseName = "pageMetadataBase";

  if (!src.includes('from "next"') && !src.includes("from 'next'")) {
    src = `import type { Metadata } from "next";\n` + src;
  } else if (!src.includes("type { Metadata }") && !src.includes("Metadata }")) {
    src = src.replace(
      /import type \{([^}]+)\} from "next";/,
      (m, g) => (g.includes("Metadata") ? m : `import type { Metadata, ${g.trim()} } from "next";`)
    );
  }

  if (!src.includes("getPageDomainConfig")) {
    src = src.replace(/(import type \{ Metadata \} from "next";\n)/, `$1${imports}`);
    if (!src.includes("getPageDomainConfig")) {
      const firstImport = src.match(/^import .+;\n/m);
      if (firstImport) {
        src = src.replace(firstImport[0], firstImport[0] + imports);
      } else {
        src = imports + src;
      }
    }
  }

  const replacement = `const ${baseName} = ${metaObject};

export async function generateMetadata(): Promise<Metadata> {
  const config = await getPageDomainConfig();
  return applyMesaskyeviewToMetadata(config, {
    title: String(${baseName}.title ?? ""),
    description: String(${baseName}.description ?? ""),
    pathname: "${pathname}",
    keywords: ${baseName}.keywords as string[] | undefined,
    noIndex: ${baseName}.robots?.index === false,
  });
}`;

  src = src.replace(/export const metadata:\s*Metadata\s*=\s*\{[\s\S]*?\n\};/, replacement);
  fs.writeFileSync(file, src);
  console.log("Updated:", rel);
}

console.log("Done.");
