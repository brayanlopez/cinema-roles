import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["test/**/*.test.js"],
    coverage: {
      provider: "v8",
      include: ["js/**/*.mjs", "data/**/*.mjs"],
      exclude: ["js/index.mjs"],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 75,
        branches: 80,
        functions: 80,
        lines: 70,
      },
    },
  },
});
