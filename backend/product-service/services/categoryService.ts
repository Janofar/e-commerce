// src/services/CategoryService.ts
import { CategoryRepository } from '../repositories/categoryRepository';

class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  async createCategory(data: any) {
    return await this.categoryRepo.createCategory(data);
  }

  async getCategories() {
    return await this.categoryRepo.getCategories();
  }

  async getCategoryById(id: string) {
    return await this.categoryRepo.getCategoryById(id);
  }

  async updateCategory(id: string, data: any) {
    return await this.categoryRepo.updateCategory(id, data);
  }

  async deleteCategory(id: string) {
    return await this.categoryRepo.deleteCategory(id);
  }

  async getCategoryBySlug(slug: string) {
    return await this.categoryRepo.getCategoryBySlug(slug);
  }
}
export default new CategoryService();