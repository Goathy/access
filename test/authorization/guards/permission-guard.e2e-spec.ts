import { Controller, Get, INestApplication, UseGuards } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthorizationModule } from '../../../src/authorization/authorization.module';
import { SetPermision } from '../../../src/authorization/decorators/set-permission.decorator';
import { Permissions } from '../../../src/authorization/enums/permissions.enum';
import { PermissionsGuard } from '../../../src/authorization/guards/permissions.guard';
import { User } from '../../../src/users/entities/user.entity';
import { UsersService } from '../../../src/users/services/users.service';
import { UsersModule } from '../../../src/users/users.module';

@Controller('/test')
class TestController {
  @Get()
  @SetPermision(Permissions.CREATE)
  @UseGuards(PermissionsGuard)
  testRoute() {
    return 'foo';
  }
}

describe('PermissionGuard', () => {
  let app: INestApplication;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthorizationModule],
      controllers: [TestController],
    }).compile();

    app = moduleFixture.createNestApplication();

    usersService = app.get(UsersService);

    await app.init();
  });

  it('should not pass if user has insufficient permissions', () => {
    const user = new User(Permissions.READ);

    // @ts-expect-error access inmemory users store
    usersService.users.set(user.id, user);

    return request(app.getHttpServer())
      .get('/test')
      .set('x-user-id', user.id)
      .expect(403);
  });

  it('should pass if user permissions match', () => {
    const user = new User(Permissions.CREATE);

    // @ts-expect-error access inmemory users store
    usersService.users.set(user.id, user);

    return request(app.getHttpServer())
      .get('/test')
      .set('x-user-id', user.id)
      .expect(200);
  });

  it('should pass if user has all permisions', () => {
    const user = new User(Permissions.ALL);

    // @ts-expect-error access inmemory users store
    usersService.users.set(user.id, user);

    return request(app.getHttpServer())
      .get('/test')
      .set('x-user-id', user.id)
      .expect(200);
  });
});
