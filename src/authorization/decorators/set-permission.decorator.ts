import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../enums/permissions.enum';
import { PERMISSIONS } from '../constants/permissions.constant';

export const SetPermision = (permission: Permissions) =>
  SetMetadata(PERMISSIONS, permission);
