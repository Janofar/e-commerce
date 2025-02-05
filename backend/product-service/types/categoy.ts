
export interface CategoryInput{
    name: string;
    parentId?: number | null;
    description?: string;
    attributes : Array<{
        name : string,
        type : string,
        options ?: string[]
    }> | null
}

export interface AttributeType {
    name : string,
    type : string,
    options ?: string[]
}