import { PrismaClient } from '@prisma/client';
import { polishDefaultUser, polishPartialUser, polishUser } from './prisma/omit-extra-fields';

const prisma = new PrismaClient();

const userWithExtraFields = {
  email: 'test@gmail.com',
  name: 'test',
  role: 'Default',
  a: 1,
} as const;

// typescript is satisfied, but prisma will throw error
// because of extra field 'a: 1'
prisma.user.create({ data: userWithExtraFields });

// this one will be fine for prisma
prisma.user.create({ data: polishUser(userWithExtraFields) })

// or this one, if you want more excplicit types
prisma.user.create({ data: polishDefaultUser(userWithExtraFields) });
prisma.user.findFirst({ where: polishPartialUser(userWithExtraFields) });