import User from '../models/User';

class UserRepository {
  async createUser(data: Partial<User>): Promise<User> {
    return await User.create(data);
  }

  async findUserById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findAllUsers(): Promise<User[]> {
    return await User.findAll();
  }

  async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number): Promise<number> {
    return await User.destroy({ where: { id } });
  }
}

export default new UserRepository();
