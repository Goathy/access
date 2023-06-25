import { PartialType } from '@nestjs/mapped-types';
import { Permissions } from '../../authorization/enums/permissions.enum';
import { CreateUser } from './create-user.dto';

export class UpdateUser extends PartialType(CreateUser) {
  constructor(...permissions: Permissions[]) {
    super();
    this.permissions = permissions;
  }
}
