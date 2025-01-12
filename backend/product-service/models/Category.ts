import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICategory extends Document {
    _id: string;
    name: string;
    slug: string;
    parent_id?: string | null;
    ancestors: {
        _id: string;
        name: string;
        slug: string;
    }[];
    description?: string;
    created_at: Date;
    updated_at: Date;
}
// {
//     "_id": "dress_women", // Unique identifier for the category
//     "name": "Women's Dresses",
//     "slug": "womens-dresses",
//     "parent_id": "clothing", // Reference to the parent category
//     "ancestors": [
//       { "_id": "clothing", "name": "Clothing", "slug": "clothing" }
//     ],
//     "description": "Explore our collection of women's dresses for every occasion.",
//     "created_at": "2025-01-06T10:00:00Z",
//     "updated_at": "2025-01-06T12:00:00Z"
// }

const CategorySchema = new mongoose.Schema({
    _id: { type: String, required: true }, // e.g., 'dress_women'
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // SEO-friendly URLs
    parent_id: { type: String, default: null }, // References parent category
    ancestors: [
        {
            _id: { type: String },
            name: { type: String },
            slug: { type: String }
        }
    ],
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);

export { Category, ICategory };