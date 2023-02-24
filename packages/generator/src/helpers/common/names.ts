export const getDefaultInputTypeName = (modelName: string) => `${modelName}DefaultInput`;

export const getPartialInputTypeName = (modelName: string) => `${modelName}PartialInput`;

export const getModelFieldsVariableName = (modelName: string): string => {
    return `${modelName.toLowerCase()}Fields`;
  }