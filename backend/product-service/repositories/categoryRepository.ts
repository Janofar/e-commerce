import { QueryTypes, Transaction } from "sequelize";
import Category, { ICategory } from "../models/Category";
import CategoryAttribute, { ICategoryAttribute } from "../models/CategoryAttribute";
import sequelize from "../../config/database";

export class CategoryRepository {
  // Create a new category
  async createCategory(data: ICategory, options?: { transaction?: Transaction }) {
    return await Category.create(data, { transaction: options?.transaction });
  }

  async createCategoryAttribute(data: ICategoryAttribute[], options?: { transaction?: Transaction }) {
    try {
      const categoryAttributes = await CategoryAttribute.bulkCreate(data, { transaction: options?.transaction });
      return categoryAttributes;
    } catch (error) {
      console.error("Error creating category attributes:", error);
      throw error;
    }
  }

  // Get all categories
  async getCategories() {
    const query = `SELECT 
        c.*,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', ca.id,
                'name', ca.name,
                'type', ca.type,
                'options' , ca.options
            )
        ) AS attributes
        FROM test.categories c
        LEFT JOIN test.category_attributes ca ON c.id = ca.categoryId
        GROUP BY c.id;`;
    const categories = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    return categories;
  }

  // Get a category by its ID
  async getCategoryById(id: string) {
    return await Category.findOne({ where: { id } });
  }

  // Update a category by its ID
  async updateCategory(id: string, data: any) {
    return await Category.update(data, { where: { id }, returning: true });
  }

  // Delete a category by its ID
  async deleteCategory(id: string) {
    return await Category.destroy({ where: { id } });
  }

  // Get category by slug (unique)
  async getCategoryBySlug(slug: string) {
    return await Category.findOne({ where: { slug } });
  }
}
