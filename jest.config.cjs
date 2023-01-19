module.exports = {
  clearMocks: true,
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  preset: 'react-native',
  transform: {
    "^.+\\.(ts|tsx)?$": [
      'ts-jest', {
        tsconfig: './configs/tsconfig.base.json',
      }
    ],
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testMatch: [
    "<rootDir>/tests/*.test.tsx"
  ]
}
