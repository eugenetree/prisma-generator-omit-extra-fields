import { DMMF } from "@prisma/generator-helper";
import { getModelFieldsVariableName } from "./common/names";

export const getModelFieldsCode = (model: DMMF.Model) => {
    const fieldNames = model.fields.reduce((res, field) => `${res} '${field.name}',`, '')
    return `const ${getModelFieldsVariableName(model.name)} = [${fieldNames}]`;
  }