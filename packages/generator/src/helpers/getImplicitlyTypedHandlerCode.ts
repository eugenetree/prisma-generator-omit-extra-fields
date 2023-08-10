import { DMMF } from '@prisma/generator-helper'
import { getModelFieldsVariableName } from './common/names'

export const getImplicitlyTypedHandlerCode = (model: DMMF.Model) => {
  return `export const polish${model.name} = <T>(input: T): T => {
      const result = {};
  
      ${getModelFieldsVariableName(model.name)}.forEach((item) => {
        const key = Object.keys(item)[0]
        const value = item[key]

        if (!(input[key] === undefined || input[key] === null || input[key] === 'null' || input[key] === 'undefined')) {
          switch (value) {
            case 'Boolean':
              result[key] = Boolean(input[key])
              break
            case 'String':
              result[key] = String(input[key])
              break
            case 'DateTime':
              result[key] = new Date(input[key])
              break
            case 'Int':
            case 'Float':
            case 'Double':
            case 'Decimal':
              result[key] = input[key] === '' ? undefined : Number(input[key])
              break
            default:
              result[key] = input[key]
          }
        }
        else result[key] = undefined
      })
  
      return result as T;
    }`
}
