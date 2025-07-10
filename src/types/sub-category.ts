interface SubCategory {
    id: number
    category_id: number
    name: string
    description: string
    cover_image: string | null
    icon_image: string | null
    is_active: boolean
    total_products: number
    created_at: string
    updated_at: string
}

export default SubCategory