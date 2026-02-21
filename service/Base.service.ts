import { ValidationError } from "@/lib/errors";

interface PrismaDelegate<T> {
  findFirst(args: any): Promise<T | null>;
}

export class BaseService {
  public async ensureOwnership<T>(
    delegate: PrismaDelegate<T>,
    id: string,
    userId: string,
    entityName: string = "Resource",
  ): Promise<T> {
    const record = await delegate.findFirst({
      where: { id, userId },
    });

    if (!record) {
      throw new ValidationError(`${entityName} not found or unauthorized`);
    }

    return record;
  }
}
