import { Request, Response } from 'express';
import ProductService from '../services/productService';
import createMulterInstance from '../../shared/upload';
import sequelize from '../../config/database';

class ProductController {
  async createProduct(req: Request, res: Response): Promise<void> {
    const transaction = await sequelize.transaction();
    try {
      const upload = createMulterInstance(`uploads/productImages`).array("images");
      let imagePaths: string[] | null = null;
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
    
        const files = req.files as Express.Multer.File[];
        imagePaths = files.map((file) => file.path);
        
        const product = await ProductService.createProduct(req.body,{transaction,imagePaths});
        await transaction.commit();
        res.status(201).json({product,message :'Product added successfully' });
      });
    } catch (error) {
      await transaction.rollback();
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.deleteProduct(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default new ProductController();
