<h1>prisma-generator-omit-extra-fields</h1>

[![npm version](https://badge.fury.io/js/prisma-generator-omit-extra-fields.svg)](https://badge.fury.io/js/prisma-generator-omit-extra-fields) <br>
[![npm](https://img.shields.io/npm/dt/prisma-generator-omit-extra-fields.svg)](https://www.npmjs.com/package/prisma-generator-omit-extra-fields) <br>
 [![HitCount](https://hits.dwyl.com/eugenetree/prisma-generator-omit-extra-fields.svg?style=flat-square&show=unique)](http://hits.dwyl.com/eugenetree/prisma-generator-omit-extra-fields)

## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)


# Motivation
Motivation of this generator - fix typescript and prisma mismatch in case of "exact" types.
In typescript, if value has all required fields and some extra fields - typescript will be satisfied:
```typescript
type Person = {
  first: string, last: string
}

declare function savePerson(person: Person);

const tooFew = { first: 'Stefan' };
const exact = { first: 'Stefan', last: 'Baumgartner' }
const tooMany = { first: 'Stefan', last: 'Baumgartner', age: 37 }

savePerson(tooFew); // 💥 doesn't work
savePerson(exact); // ✅ satisfies the contract
savePerson(tooMany); // ✅ satisfies the contract

// example from "https://fettblog.eu/"
```
But despite typescript satisfaction, prisma will throw error in case of having extra fields being passed.<br>
As a solution - this generator creates utility functions to omit extra fields.

<h5>Links related to this problem:</h5>

- [github issue](https://github.com/prisma/prisma/issues/5220)
- [stackoverflow question](https://stackoverflow.com/questions/71101647/how-to-ignore-extra-fields-when-storing-prisma-data)

# Installation

Using npm:

```bash
 npm i --save-dev prisma-generator-omit-extra-fields
```

Using yarn:

```bash
 yarn add -D prisma-generator-omit-extra-fields
```

# Usage

1 - Add the generator to your Prisma schema

```prisma
generator omitExtraFields {
  provider = "prisma-generator-omit-extra-fields"
  
  // optional parameter to change directory or name of generated file
  // if output is specified, it should contain filename of generated file
  // (output like "../generated" is invalid)
  output = "../generated/extra-fields.ts"
}
```

2- Run `npx prisma generate` for the following schema.prisma, or your schema

```prisma
enum Role {
  Admin
  Default
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name      String
  email     String
  role      Role
}
```

3 - Now you're able to use generated functions. For above schema you'll get next functions:

```typescript
  polishUser(user); // remove extra fields but has no explicit types
  polishDefaultUser(user); // remove extra fields and is suitable for "data" field in queries
  polistPartialUser(user); // remove extra fields and is suitalble for "where" field in queries 
```
Example of their usage: 
```typescript
const userWithExtraFields = {
  email: 'test@gmail.com',
  name: 'test',
  role: 'Default',
  a: 1, // extra field
} as const;

// typescript is satisfied, but prisma will throw error
// because of extra field 'a: 1'
prisma.user.create({ data: userWithExtraFields });

// this one will be fine for prisma
prisma.user.create({ data: polishUser(userWithExtraFields) })

// or this one, if you want more excplicit types
prisma.user.create({ data: polishDefaultUser(userWithExtraFields) });
prisma.user.findFirst({ where: polishPartialUser(userWithExtraFields) });
```