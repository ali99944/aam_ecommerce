interface FaqCategory {
    id: number;
    name: string;
    description?: string | null;
    key: string;
    displayOrder: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

}

export default FaqCategory