import { DMMF } from "@prisma/generator-helper"
import { getModelFieldsVariableName } from "./common/names"

export const getImplicitlyTypedHandlerCode = (model: DMMF.Model) => {
  return `export const polish${model.name} = <T>(input: T): T => {
      const result:Record<string, any> = {};
  
      ${getModelFieldsVariableName(model.name)}.forEach((key) => {
        result[key] = (input as any)[key];
      })
  
      return result as T;
    }`
}
