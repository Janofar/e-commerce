// src/controllers/CategoryController.ts
import { Request, Response } from 'express';
import CategoryService from '../services/categoryService';

class CategoryController {

    // Create a new category
    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.createCategory(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
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
