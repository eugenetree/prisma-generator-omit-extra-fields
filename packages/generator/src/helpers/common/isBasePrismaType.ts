import { BASE_PRISMA_TYPES_TO_TS } from "../../constants";

export const isBasePrismaType =
  (fieldType: string):
    fieldType is keyof typeof BASE_PRISMA_TYPES_TO_TS => {
    return BASE_PRISMA_TYPES_TO_TS.hasOwnProperty(fieldType);
  }