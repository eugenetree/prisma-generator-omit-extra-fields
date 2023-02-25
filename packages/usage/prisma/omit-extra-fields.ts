const userFields = ['id', 'createdAt', 'email', 'name'];

export const polishUser = <T>(input: T): T => {
  const result = {};

  userFields.forEach((key) => {
    result[key] = input[key];
  });

  return result as T;
};

type UserDefaultInput = {
  id?: number;
  createdAt?: Date;
  email: string;
  name?: string;
};

type UserPartialInput = {
  id?: number;
  createdAt?: Date;
  email?: string;
  name?: string;
};

export const polishDefaultUser = (
  input: UserDefaultInput,
): UserDefaultInput => {
  const result = {};

  userFields.forEach((key) => {
    result[key] = input[key];
  });

  return result as UserDefaultInput;
};

export const polishPartialUser = (
  input: UserPartialInput,
): UserPartialInput => {
  const result = {};

  userFields.forEach((key) => {
    result[key] = input[key];
  });

  return result as UserPartialInput;
};

// - - - - - - - - //

const postFields = [
  'id',
  'createdAt',
  'updatedAt',
  'published',
  'title',
  'authorId',
];

export const polishPost = <T>(input: T): T => {
  const result = {};

  postFields.forEach((key) => {
    result[key] = input[key];
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

  postFields.forEach((key) => {
    result[key] = input[key];
  });

  return result as PostDefaultInput;
};

export const polishPartialPost = (
  input: PostPartialInput,
): PostPartialInput => {
  const result = {};

  postFields.forEach((key) => {
    result[key] = input[key];
  });

  return result as PostPartialInput;
};

// - - - - - - - - //
