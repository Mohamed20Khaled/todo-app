import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts", // Ensure this path points to your setup file
    include: ["test/**/*.{test,spec}.{ts,tsx}"], // Look for test files with specific extensions
  },
});
