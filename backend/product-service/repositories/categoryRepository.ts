// src/repositories/CategoryRepository.ts
import { Category } from '../models/Category';

export class CategoryRepository {
  // Create a new category
  async createCategory(data: any) {
    const category = new Category(data);
    return await category.save();
  }

  // Get all categories
  async getCategories() {
    return await Category.find();
  }

  // Get a category by its ID
  async getCategoryById(id: string) {
    return await Category.findById(id);
  }

  // Update a category by its ID
  async updateCategory(id: string, data: any) {
    return await Category.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete a category by its ID
  async deleteCategory(id: string) {
    return await Category.findByIdAndDelete(id);
  }

  // Get category by slug (unique)
  async getCategoryBySlug(slug: string) {
    return await Category.findOne({ slug });
  }
}
