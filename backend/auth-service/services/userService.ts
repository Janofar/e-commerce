import UserRepository from '../repositories/UserRepository';
import User from '../models/User';

class UserService {
  async createUser(data: Partial<User>): Promise<User> {
    return await UserRepository.createUser(data);
  }

  async getUserById(id: number): Promise<User | null> {
    return await UserRepository.findUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await UserRepository.findAllUsers();
  }

  async updateUser(id: number, data: Partial<User>): Promise<[number, User[]]> {
    return await UserRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<number> {
    return await UserRepository.deleteUser(id);
  }
}

export default new UserService();
