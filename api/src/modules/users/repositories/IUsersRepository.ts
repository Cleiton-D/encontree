import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  findByUsername: (username: string) => Promise<User | undefined>;
  listByIds: (ids: string[]) => Promise<User[]>;
  create: (data: ICreateUserDTO) => Promise<User>;
  update: (user: User) => Promise<User>;
}
