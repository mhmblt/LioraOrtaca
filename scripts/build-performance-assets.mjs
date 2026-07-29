import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let sharp;

try {
  sharp = require("sharp");
} catch {
  throw new Error(
    "The image build requires the 'sharp' package. Install it locally or run with NODE_PATH pointing to a runtime that provides sharp."
  );
}

const scriptsDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptsDirectory, "..");
const assetsDirectory = path.join(projectDirectory, "assets");

const imageSets = [
  { name: "liora-corner", widths: [480, 768, 1200, 1672] },
  { name: "liora-facade", widths: [480, 768, 1200, 1672] },
  { name: "liora-masterplan", widths: [480, 768, 1200, 1672] },
  { name: "liora-aerial", widths: [480, 768, 1200, 1448] }
];

const cssBundles = [
  {
    output: "app.css",
    inputs: [
      "fonts.css",
      "style.css",
      "enhancements.css",
      "conversion.css",
      "map-fallback.css",
      "precision.css",
      "language.css",
      "whatsapp-widget.css",
      "seo-landing.css"
    ]
  },
  {
    output: "legal.bundle.css",
    inputs: ["fonts.css", "legal.css"]
  }
];

const removeLegacyImageBackgrounds = (source) => source
  .replaceAll("background-image:url('assets/liora-facade.png');", "")
  .replaceAll("background-image:url('assets/liora-corner.png');", "")
  .replaceAll("background-image:url('assets/liora-corner.webp');", "")
  .replaceAll("background-image:url('assets/liora-masterplan.png');", "")
  .replaceAll("background-image:url('assets/liora-masterplan.webp');", "")
  .replaceAll("background-image:url('/assets/liora-masterplan.webp');", "");

for (const imageSet of imageSets) {
  const inputPath = path.join(assetsDirectory, `${imageSet.name}.png`);

  await Promise.all(
    imageSet.widths.flatMap((width) => {
      const resized = sharp(inputPath)
        .rotate()
        .resize({ width, withoutEnlargement: true });

      return [
        resized
          .clone()
          .avif({ quality: 55, effort: 6, chromaSubsampling: "4:2:0" })
          .toFile(path.join(assetsDirectory, `${imageSet.name}-${width}.avif`)),
        resized
          .clone()
          .webp({ quality: 74, effort: 5, smartSubsample: true })
          .toFile(path.join(assetsDirectory, `${imageSet.name}-${width}.webp`))
      ];
    })
  );
}

for (const bundle of cssBundles) {
  const sources = await Promise.all(
    bundle.inputs.map(async (input) => {
      const source = await fs.readFile(path.join(projectDirectory, input), "utf8");
      return `/* ${input} */\n${removeLegacyImageBackgrounds(source).trim()}`;
    })
  );

  await fs.writeFile(
    path.join(projectDirectory, bundle.output),
    `${sources.join("\n\n")}\n`,
    "utf8"
  );
}

console.log("Generated responsive AVIF/WebP images and CSS bundles.");
