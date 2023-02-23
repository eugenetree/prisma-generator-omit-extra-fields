import { DMMF } from "@prisma/generator-helper"

export const getImplicitlyTypedHandlerCode = (
    { modelName }: { modelName: DMMF.Model['name'] }
  ) => {
    return `export const polish${modelName} = <T>(input: T): T => {
      const result = {};
  
      ${modelName.toLowerCase()}Keys.forEach((key) => {
        result[key] = input[key];
      })
  
      return result as T;
    }`
  }