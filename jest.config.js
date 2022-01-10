module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testRegex: '.(test|spec).ts$',
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: './coverage/',
  moduleFileExtensions: ["ts", "js"],
};