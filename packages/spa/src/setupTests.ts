import { GlobalWithFetchMock } from 'jest-fetch-mock';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock'); // tslint:disable-line no-var-requires
customGlobal.fetchMock = customGlobal.fetch;
