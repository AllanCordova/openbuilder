import { Prisma } from "@prisma/client";

export type ComponentLibraryDto = {
  id: string;
  name: string;
  default_schema_json: Prisma.JsonValue;
};
