const userFields = [
  { id: 'Int' },
  { createdAt: 'DateTime' },
  { email: 'String' },
  { name: 'String' },
  { role: 'Role' },
  { posts: 'Post' },
];

export const polishUser = <T>(input: T): T => {
  const result = {};

  userFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as T;
};

type UserDefaultInput = {
  id?: number;
  createdAt?: Date;
  email: string;
  name?: string;
  role: 'Admin' | 'Default';
};

type UserPartialInput = {
  id?: number;
  createdAt?: Date;
  email?: string;
  name?: string;
  role?: 'Admin' | 'Default';
};

export const polishDefaultUser = (
  input: UserDefaultInput,
): UserDefaultInput => {
  const result = {};

  userFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as UserDefaultInput;
};

export const polishPartialUser = (
  input: UserPartialInput,
): UserPartialInput => {
  const result = {};

  userFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as UserPartialInput;
};

// - - - - - - - - //

const postFields = [
  { id: 'Int' },
  { createdAt: 'DateTime' },
  { updatedAt: 'DateTime' },
  { published: 'Boolean' },
  { title: 'String' },
  { author: 'User' },
  { authorId: 'Int' },
];

export const polishPost = <T>(input: T): T => {
  const result = {};

  postFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as T;
};

type PostDefaultInput = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  title: string;
  authorId?: number;
};

type PostPartialInput = {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  title?: string;
  authorId?: number;
};

export const polishDefaultPost = (
  input: PostDefaultInput,
): PostDefaultInput => {
  const result = {};

  postFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as PostDefaultInput;
};

export const polishPartialPost = (
  input: PostPartialInput,
): PostPartialInput => {
  const result = {};

  postFields.forEach((item) => {
    const key = Object.keys(item)[0];
    const value = item[key];

    if (
      !(
        input[key] === undefined ||
        input[key] === null ||
        input[key] === 'null' ||
        input[key] === 'undefined'
      )
    ) {
      if (value === 'String') result[key] = String(input[key]);
      if (value === 'DateTime') result[key] = new Date(input[key]);
      if (
        value === 'Int' ||
        value === 'Float' ||
        value === 'Double' ||
        value === 'Decimal'
      )
        result[key] = input[key] === '' ? undefined : Number(input[key]);
      else result[key] = input[key];
    } else result[key] = undefined;
  });

  return result as PostPartialInput;
};

// - - - - - - - - //
