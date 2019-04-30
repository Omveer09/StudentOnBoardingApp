import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User } from './models/user';

export class UserData implements InMemoryDbService {

  createDb() {
    const users: User[] = [
      {
        'userName': 'admin',
        'password' : 'admin'
      }
    ];
    return { users };
  }
}
