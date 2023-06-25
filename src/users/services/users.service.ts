import { Injectable } from '@nestjs/common';
import { CreateUser } from '../dto/create-user.dto';
import { UpdateUser } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = new Map<User['id'], User>();

  create(createUser: CreateUser): void {
    const user = new User(...createUser.permissions);
    this.users.set(user.id, user);
  }

  findAll(): User[] {
    return Array.from(this.users.values());
  }

  findOne(id: string): User {
    return this.users.get(id);
  }

  update(id: string, updateUser: UpdateUser): void {
    const user = this.users.get(id);

    Object.assign(user, updateUser);

    this.users.set(user.id, user);
  }

  remove(id: string): void {
    this.users.delete(id);
  }
}
