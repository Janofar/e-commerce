export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    description?: string;
    attributes: CategoryAttribute[]
}

export interface CategoryAttribute {
   name: string; type: string; options?: string[];
}

export interface CategoryPayload{
    name: string;
    parent_id: number;
    description: string;
    attributes: CategoryAttribute[]
}