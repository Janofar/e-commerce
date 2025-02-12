export interface Category {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
    description?: string;
    attributes: CategoryAttribute[]
}

export interface CategoryAttribute {
   id?: number | null,name: string; type: string; options?: string[];
}

export interface CategoryPayload{
    name: string;
    parentId: number | null;
    description: string;
    attributes: CategoryAttribute[]
}