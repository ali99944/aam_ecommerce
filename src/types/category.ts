// Category and SubCategory interfaces based on the API response

export interface SubCategory {
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
  
  export default interface Category {
    id: number
    name: string
    description: string
    is_active: boolean
    is_featured: string
    total_sub_categories: number
    cover_image: string
    icon_image: string
    created_at: string
    updated_at: string
    sub_categories?: SubCategory[]
  }
  