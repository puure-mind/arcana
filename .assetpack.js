import { pixiManifest } from "@assetpack/core/manifest";

/** @type {import("@assetpack/core").AssetPackConfig} */
const config = {
  entry: "./raw-assets",
  output: "./public/assets",
  ignore: ["**/.gitkeep"],
  cache: true,
  cacheLocation: ".assetpack",
  strict: true,
  pipes: [
    pixiManifest({
      output: "manifest.json",
      createShortcuts: true,
      trimExtensions: true,
      includeMetaData: false,
      nameStyle: "short",
    }),
  ],
};

export default config;
