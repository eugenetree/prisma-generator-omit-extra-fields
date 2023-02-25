import { DMMF } from "@prisma/generator-helper";
import { PRISMA_TYPES_TO_TS } from "../constants";
import { getModelFieldsVariableName } from "./common/names";

export const getModelFieldsCode = (model: DMMF.Model) => {
    const fieldNames = model.fields.reduce((res, field) => {
      return PRISMA_TYPES_TO_TS[field.type] ? `${res} '${field.name}',` : res;
    }, '')
    return `const ${getModelFieldsVariableName(model.name)} = [${fieldNames}]`;
  }