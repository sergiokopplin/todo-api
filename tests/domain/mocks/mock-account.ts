import faker from 'faker';

import { AddAccount } from '@/domain/usecases';

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
