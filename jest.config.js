module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
      '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFiles: [
      "./SetupJest.js"
    ]
  };

//   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//   '<rootDir>/__mocks__/fileMock.js',