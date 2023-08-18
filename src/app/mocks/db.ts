import { factory, primaryKey } from "@mswjs/data";
import { faker } from '@faker-js/faker';

export const db = factory({
  user: {
    id: primaryKey(faker.number.int),
    name: faker.string.sample,
    username: faker.string.sample,
    email: faker.string.sample,
    city: faker.string.sample,
  },
});

for (let index = 0; index < 10; index++) {
  db.user.create();
}