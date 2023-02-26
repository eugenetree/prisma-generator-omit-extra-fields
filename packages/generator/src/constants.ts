export const GENERATOR_NAME = 'prisma-generator-omit-extra-fields';
export const DEFAULT_OUTPUT_PATH = './omit-extra-fields.ts'

export const BASE_PRISMA_TYPES_TO_TS = {
  'Int': 'number',
  'BigInt': 'number',
  'Decimal': 'number',
  'Float': 'number',
  'String': 'string',
  'Bytes': 'string',
  'Boolean': 'boolean',
  'DateTime': 'Date',
} as const;