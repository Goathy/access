import { Test, TestingModule } from '@nestjs/testing';
import { Permissions } from '../../authorization/enums/permissions.enum';
import { CreateUser } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', () => {
    const payload = new CreateUser(Permissions.ALL);

    service.create(payload);

    // @ts-expect-error access inmemory users store
    const [exists] = Array.from(service.users.values());

    expect(exists).toMatchObject({
      id: expect.any(String),
      permissions: ['ALL'],
    });
  });

  it('findOne', () => {
    const user = new User(Permissions.READ);

    // @ts-expect-error access inmemory users store
    service.users.set(user.id, user);

    const foundUser = service.findOne(user.id);

    expect(foundUser).toMatchObject(user);
  });

  it('findAll', () => {
    const users = Array.from({ length: 10 }, () => new User(Permissions.READ));

    // @ts-expect-error access inmemory users store
    service.users = new Map(users.map((user) => [user.id, user]));

    const foundUsers = service.findAll();

    expect(foundUsers).toMatchObject(users);
  });
});
