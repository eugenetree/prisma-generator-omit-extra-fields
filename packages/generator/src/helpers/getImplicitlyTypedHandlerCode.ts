import { DMMF } from "@prisma/generator-helper"
import { getModelFieldsVariableName } from "./common/names"

export const getImplicitlyTypedHandlerCode = (model: DMMF.Model) => {
  return `export const polish${model.name} = <T>(input: T): T => {
      const result = {};
  
      ${getModelFieldsVariableName(model.name)}.forEach((key) => {
        result[key] = input[key];
      })
  
      return result as T;
    }`
}