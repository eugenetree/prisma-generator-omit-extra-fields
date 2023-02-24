import { DMMF } from "@prisma/generator-helper";
import { getDefaultInputTypeName, getModelFieldsVariableName, getPartialInputTypeName } from "./common/names";

const prismaTypesToTs: Record<string, string> = {
  'Int': 'number',
  'String': 'string',
  'Boolean': 'boolean',
  'DateTime': 'Date',
}

const isFieldTypeOptional = (field: DMMF.Field): boolean => {
  return !field.isRequired || field.hasDefaultValue;
}

const getInputTypesCode = (model: DMMF.Model): string => {
  const defaultInputTypeName = getDefaultInputTypeName(model.name);
  const partialInputTypeName = getPartialInputTypeName(model.name);

  let result: string = `type ${defaultInputTypeName} = {`;
  model.fields.forEach((field) => {
    const tsType = prismaTypesToTs[field.type];
    if (tsType !== undefined) {
      result += ` ${field.name}${isFieldTypeOptional(field) ? '?' : ''}: ${tsType};`
    }
  })

  result += `}; \n\n type ${partialInputTypeName} = {`
  model.fields.forEach((field) => {
    const tsType = prismaTypesToTs[field.type];
    if (tsType !== undefined) {
      result += ` ${field.name}?: ${tsType};`
    }
  })

  result += '}'
  return result;
}

export const getExplicitlyTypedHandlersCode = (model: DMMF.Model) => {
  let result = getInputTypesCode(model);
  const handlersData = [
    { functionName: `polishDefault${model.name}`, typeName: getDefaultInputTypeName(model.name) },
    { functionName: `polishPartial${model.name}`, typeName: getPartialInputTypeName(model.name) }
  ]

  for (const { functionName, typeName } of handlersData) {
    result += `\n\n export const ${functionName} = (input: ${typeName}): ${typeName} => {
        const result = {};
    
        ${getModelFieldsVariableName(model.name)}.forEach((key) => {
          result[key] = input[key];
        })
    
        return result as ${typeName};
      }`
  }
  return result;
}