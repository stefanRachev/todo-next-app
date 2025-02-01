//jest.setup.js

import '@testing-library/jest-dom';

module.exports = {
    moduleNameMapper: {
      '^@/components/(.*)$': '<rootDir>/components/$1',
    },
  };
