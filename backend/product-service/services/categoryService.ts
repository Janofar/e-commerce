// src/services/CategoryService.ts
import { Transaction } from 'sequelize';
import { CategoryRepository } from '../repositories/categoryRepository';
import { AttributeType, CategoryInput } from '../types/categoy';
import { generateSlug } from '../utils/helper';

class CategoryService {
  private categoryRepo: CategoryRepository;

  constructor() {
    this.categoryRepo = new CategoryRepository();
  }

  async createCategory(data: CategoryInput, options?: { transaction?: Transaction }) {
    const updatedData = { ...data, slug: generateSlug(data.name) } as CategoryInput & { slug: string };
    return await this.categoryRepo.createCategory(updatedData,options);
  }

  async createCategoryAttribute(attributes: AttributeType[],options: { transaction?: Transaction ,categoryId: number} ) {
    const formattedAttributes = attributes.map(attr => ({ ...attr, categoryId: options.categoryId }));
    return this.categoryRepo.createCategoryAttribute(formattedAttributes,{transaction: options.transaction});
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