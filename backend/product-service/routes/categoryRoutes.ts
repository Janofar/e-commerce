// src/routes/CategoryRoutes.ts
import { Router } from 'express';
import CategoryController  from '../controllers/categoryController';

const router: Router = Router();

// Routes for category management
router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getCategories);
router.get('/:id', CategoryController.getCategoryById);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);
router.get('/slug/:slug', CategoryController.getCategoryBySlug);

export default router;