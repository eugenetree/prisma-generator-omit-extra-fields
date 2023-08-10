import { DMMF } from '@prisma/generator-helper'
import { isBasePrismaType } from './common/isBasePrismaType'

import { getModelFieldsVariableName } from './common/names'

const shouldPrismaFieldBeAddedToList = (field: DMMF.Field) => {
  return (
    isBasePrismaType(field.type) ||
    field.kind === 'enum' ||
    field.kind === 'scalar' ||
    field.kind === 'object'
  )
}

export const getModelFieldsCode = (model: DMMF.Model) => {
  const fieldNames = model.fields.reduce((res, field) => {
    return shouldPrismaFieldBeAddedToList(field)
      ? `${res} { '${field.name}':'${field.type}' },`
      : res
  }, '')

  return `const ${getModelFieldsVariableName(model.name)} = [${fieldNames}]`
}
