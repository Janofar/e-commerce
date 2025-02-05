// src/controllers/CategoryController.ts
import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';
import { categorySchema } from '../models/Category';
import { ValidationError } from 'sequelize';
import sequelize from '../../config/database';

class CategoryController {

    // Create a new category
    async createCategory(req: Request, res: Response) : Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            const { error, value } = categorySchema.validate(req.body, { abortEarly: false });
           
            if (error) {
                await transaction.rollback();
                res.status(400).json({ errors: error.details.map(err => err.message) });   
                return;
            }
            
            const category = await CategoryService.createCategory(value, { transaction });
            if (category && value.attributes.length) {
                await CategoryService.createCategoryAttribute(value.attributes, {categoryId : category.id,transaction});
            } else {
                await transaction.rollback();
                res.status(400).json({ error: 'Attributes cannot be null' });
                return;
            }
            
            await transaction.commit();
            res.status(201).json({category,message : 'Category created successfully'});
            return;
            
        } catch (error) {
           
            await transaction.rollback();
            if (error instanceof ValidationError) {
                const duplicateEntryError = error.errors.find(err => err.type === 'unique violation' && err.path === 'slug');
                if (duplicateEntryError) {
                    res.status(400).json({ error: 'Category with this slug already exists.' });
                    return;
                }
              }
            res.status(400).json({ error: (error as Error).message });
            return;
        }
    }

    // Get all categories
    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    // Get category by ID
    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    // Update category by ID
    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    // Delete category by ID
    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.deleteCategory(req.params.id);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    // Get category by slug
    async getCategoryBySlug(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.getCategoryBySlug(req.params.slug);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(category);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default new CategoryController();
