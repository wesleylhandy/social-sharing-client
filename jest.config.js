module.exports = {
    coverageProvider: "v8",
    testPathIgnorePatterns: ["node_modules", "<rootDir>/dist/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}