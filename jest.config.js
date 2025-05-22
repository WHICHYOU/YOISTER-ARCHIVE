/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom", // Required for DOM-related components
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"], // Prefer placing setup under tests/
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@lib/(.*)$": "<rootDir>/lib/$1",
    "^@styles/(.*)$": "<rootDir>/styles/$1",
    "^@types/(.*)$": "<rootDir>/types/$1",
  },
  transform: {
    "^.+\.(ts|tsx)$": "ts-jest", // Use ts-jest for TS support
  },
  testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"], // Standard test discovery
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
