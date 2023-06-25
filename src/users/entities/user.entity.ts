import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Permissions } from '../../authorization/enums/permissions.enum';

export class User {
  readonly id: string;
  permissions: Permissions[];

  constructor(...permissions: Permissions[]) {
    (this.id = randomStringGenerator()), (this.permissions = permissions);
  }
}
