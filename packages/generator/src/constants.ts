export const GENERATOR_NAME = 'prisma-generator-omit-extra-fields';
export const DEFAULT_OUTPUT_PATH = './omit-extra-fields.ts'

export const PRISMA_TYPES_TO_TS: Record<string, string> = {
  'Int': 'number',
  'String': 'string',
  'Boolean': 'boolean',
  'DateTime': 'Date',
}