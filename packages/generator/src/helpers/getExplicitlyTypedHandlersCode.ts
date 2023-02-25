import { DMMF } from "@prisma/generator-helper";
import { PRISMA_TYPES_TO_TS } from "../constants";
import { getDefaultInputTypeName, getModelFieldsVariableName, getPartialInputTypeName } from "./common/names";

const isFieldTypeOptional = (field: DMMF.Field): boolean => {
  return !field.isRequired || field.hasDefaultValue || Boolean(field.isUpdatedAt);
}

const getInputTypesCode = (model: DMMF.Model): string => {
  const defaultInputTypeName = getDefaultInputTypeName(model.name);
  const partialInputTypeName = getPartialInputTypeName(model.name);

  let result: string = `type ${defaultInputTypeName} = {`;
  model.fields.forEach((field) => {
    const tsType = PRISMA_TYPES_TO_TS[field.type];
    if (tsType) {
      result += ` ${field.name}${isFieldTypeOptional(field) ? '?' : ''}: ${tsType};`
    }
  })

  result += `}; \n\n type ${partialInputTypeName} = {`
  model.fields.forEach((field) => {
    const tsType = PRISMA_TYPES_TO_TS[field.type];
    if (tsType) {
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