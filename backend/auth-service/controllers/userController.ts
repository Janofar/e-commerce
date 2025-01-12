import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(req.body);
       res.status(201).json(user);
    } catch (error) {
       res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      if (!user){
        res.status(404).json({ message: 'User not found' });
        return;
      }
         
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const [rowsUpdated] = await UserService.updateUser(Number(req.params.id), req.body);
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'User not found' });
        return
      } 
       res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
       res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const rowsDeleted = await UserService.deleteUser(Number(req.params.id));
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'User not found' });
        return;
      } 
       res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
       res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default new UserController();
