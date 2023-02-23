import { DMMF } from "@prisma/generator-helper";

export const getModelFieldsCode = (
    { modelName, modelFields }:
      { modelName: DMMF.Model['name']; modelFields: DMMF.Model['fields'] }
  ) => {
    const fieldNames = modelFields.reduce((res, field) => `${res} '${field.name}',`, '')
    return `const ${modelName.toLowerCase()}Keys = [${fieldNames}]`;
  }