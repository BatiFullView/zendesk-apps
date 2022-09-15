import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { injectZafHtmlPlugin } from "@app/zendesk/vite-plugin-inject-zaf-html";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectZafHtmlPlugin(), viteCommonjs()],
  base: "./",
  build: {
    outDir: `${process.env.INIT_CWD}/dist/assets/${process.env.ADDON_TYPE}`,
    emptyOutDir: true,
  },
});
