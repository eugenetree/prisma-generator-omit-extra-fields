import { DMMF } from "@prisma/generator-helper";
import { getDefaultInputTypeName, getModelFieldsVariableName, getPartialInputTypeName } from "./common/names";

const prismaTypesToTs: Record<string, string> = {
  'Int': 'number',
  'String': 'string',
  'Boolean': 'boolean',
  'DateTime': 'Date',
}

const getInputTypesCode = (
  { modelName, modelFields }:
      { modelName: DMMF.Model['name']; modelFields: DMMF.Model['fields'] }
): string => {
  const defaultInputTypeName = getDefaultInputTypeName(modelName);
  const partialInputTypeName = getPartialInputTypeName(modelName);

  let result: string = `type ${defaultInputTypeName} = {`;
  modelFields.forEach((field) => {
      const tsType = prismaTypesToTs[field.type];
      if (tsType !== undefined) {
          result += ` ${field.name}${field.isRequired ? '' : '?'}: ${tsType};`
      }
  })

  result += `}; \n\n type ${partialInputTypeName} = {`
  modelFields.forEach((field) => {
      const tsType = prismaTypesToTs[field.type];
      if (tsType !== undefined) {
          result += ` ${field.name}?: ${tsType};`
      }
  })

  result += '}'
  return result;
}

export const getExplicitlyTypedHandlersCode = (
  { modelName, modelFields }:
    { modelName: DMMF.Model['name']; modelFields: DMMF.Model['fields'] }
) => {
  let result = getInputTypesCode({ modelName, modelFields });
  const handlersData = [
    { functionName: `polishDefault${modelName}`, typeName: getDefaultInputTypeName(modelName) },
    { functionName: `polishPartial${modelName}`, typeName: getPartialInputTypeName(modelName) }
  ]

  for (const { functionName, typeName } of handlersData) {
    result += `\n\n export const ${functionName} = (input: ${typeName}): ${typeName} => {
        const result = {};
    
        ${getModelFieldsVariableName(modelName)}.forEach((key) => {
          result[key] = input[key];
        })
    
        return result as ${typeName};
      }`
  }
  return result;
}