// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  testMatch: [
    "<rootDir>/src/**/*.(test|spec).js",
    "**/tests/**/*.test.js",
    "**/?(*.)+(spec|test).js",
  ],
};

module.exports = createJestConfig(config);
