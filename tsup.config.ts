import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/spotlight.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  banner: { js: '"use client";' },
  external: ["react", "react-dom", "next-themes"],
})
