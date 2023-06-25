import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { Permissions } from '../../authorization/enums/permissions.enum';

export class CreateUser extends PickType(User, ['permissions']) {
  constructor(...permissions: Permissions[]) {
    super();
    this.permissions = permissions;
  }
}
