import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
afterEach(() => cleanup());

global.URL.createObjectURL = () => 'blob:mock-url';
global.URL.revokeObjectURL = () => {};