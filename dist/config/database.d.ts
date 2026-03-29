import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma';
declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("../generated/prisma/runtime/client").DefaultArgs>;
export default prisma;
//# sourceMappingURL=database.d.ts.map