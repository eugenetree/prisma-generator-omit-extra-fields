import { DMMF } from "@prisma/generator-helper";
import { BASE_PRISMA_TYPES_TO_TS } from "../constants";
import { isBasePrismaType } from "./common/isBasePrismaType";

import { getDefaultInputTypeName, getModelFieldsVariableName, getPartialInputTypeName } from "./common/names";

const getPrismaFieldTsType =
  ({ field, enums }:
    { field: DMMF.Field; enums: DMMF.DatamodelEnum[] }): string | null => {
    if (isBasePrismaType(field.type)) {
      return BASE_PRISMA_TYPES_TO_TS[field.type];
    }

    if (field.kind === "enum") {
      const enumItem = enums.find((enumItem) => enumItem.name === field.type);
      return enumItem ? enumItem.values.map((value) => `'${value.name}'`).join(' | ') : null;
    }

    return null;
  }

const isFieldTypeOptional = (field: DMMF.Field): boolean => {
  return !field.isRequired || field.hasDefaultValue || Boolean(field.isUpdatedAt);
}

const getInputTypesCode =
  ({ model, enums }:
    { model: DMMF.Model, enums: DMMF.DatamodelEnum[] }): string => {
    const defaultInputTypeName = getDefaultInputTypeName(model.name);
    const partialInputTypeName = getPartialInputTypeName(model.name);

    let result: string = `type ${defaultInputTypeName} = {`;
    model.fields.forEach((field) => {
      const tsType = getPrismaFieldTsType({ field, enums });
      if (tsType) {
        result += ` ${field.name}${isFieldTypeOptional(field) ? '?' : ''}: ${tsType};`
      }
    })

    result += `}; \n\n type ${partialInputTypeName} = {`
    model.fields.forEach((field) => {
      const tsType = getPrismaFieldTsType({ field, enums });
      if (tsType) {
        result += ` ${field.name}?: ${tsType};`
      }
    })

    result += '}'
    return result;
  }

export const getExplicitlyTypedHandlersCode =
  ({ model, enums }:
    { model: DMMF.Model; enums: DMMF.DatamodelEnum[] }) => {
    let result = getInputTypesCode({ model, enums });
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