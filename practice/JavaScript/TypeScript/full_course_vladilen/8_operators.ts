interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // 'name' | 'age'

let key: PersonKeys = "name";
key = "age";

// key = 'job'

type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
};

type UserKeysNoMeta = Exclude<keyof User, "_id" | "createdAt">; // 'name' | 'email'
type SameUserKeysNoMeta = Pick<User, "name" | "email">; // 'name' | 'email'

let u1: UserKeysNoMeta = "name";
// u1 = '_id'
