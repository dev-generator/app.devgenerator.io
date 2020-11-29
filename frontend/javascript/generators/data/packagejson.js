import {CONSTANTS} from '../../constants';

const FIELDS = [
  {
    name: 'name',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: false,
    fields: [],
  },
  {
    name: 'version',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: false,
    fields: [],
  },
  {
    name: 'description',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: false,
    fields: [],
  },
  {
    name: 'license',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: false,
    fields: [],
  },
  {
    name: 'private',
    type: CONSTANTS.DATATYPES.CHECKBOX,
    optional: false,
    fields: [],
  },
  {
    name: 'keywords',
    type: CONSTANTS.DATATYPES.SIMPLEARRAY,
    optional: true,
    fields: [],
  },
  {
    name: 'homepage',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: true,
    fields: [],
  },
  {
    name: 'bugs',
    type: CONSTANTS.DATATYPES.MULTICOLUMN,
    optional: true,
    fields: ['url', 'email'],
  },
  {
    name: 'repository',
    type: CONSTANTS.DATATYPES.MULTICOLUMN,
    optional: true,
    fields: ['type', 'url'],
  },
  {
    name: 'author',
    type: CONSTANTS.DATATYPES.MULTICOLUMN,
    optional: true,
    fields: ['name', 'email'],
  },
  {
    name: 'scripts',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['name', 'script'],
  },
  {
    name: 'contributors',
    type: CONSTANTS.DATATYPES.COMPLEXARRAY,
    optional: true,
    fields: ['name', 'email', 'url'],
  },
  {
    name: 'funding',
    type: CONSTANTS.DATATYPES.COMPLEXARRAY,
    optional: true,
    fields: ['type', 'url'],
  },
  {
    name: 'files',
    type: CONSTANTS.DATATYPES.SIMPLEARRAY,
    optional: true,
    fields: [],
  },
  {
    name: 'main',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: true,
    fields: [],
  },
  {
    name: 'browser',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: true,
    fields: [],
  },
  {
    name: 'bin',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['name', 'file_path'],
  },
  {
    name: 'man',
    type: CONSTANTS.DATATYPES.TEXT,
    optional: true,
    fields: [],
  },
  {
    name: 'engines',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['name', 'version'],
  },
  {
    name: 'os',
    type: CONSTANTS.DATATYPES.SIMPLEARRAY,
    optional: true,
    fields: [],
  },
  {
    name: 'cpu',
    type: CONSTANTS.DATATYPES.SIMPLEARRAY,
    optional: true,
    fields: [],
  },
  {
    name: 'dependencies',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['package', 'version'],
  },
  {
    name: 'devDependencies',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['package', 'version'],
  },
  {
    name: 'peerDependencies',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['package', 'version'],
  },
  {
    name: 'bundledDependencies',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['package', 'version'],
  },
  {
    name: 'optionalDependencies',
    type: CONSTANTS.DATATYPES.COMPLEXTABLE,
    optional: true,
    fields: ['package', 'version'],
  },
];

export {FIELDS};
