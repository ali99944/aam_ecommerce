interface Category {
  id: number
  name: string
  description: string
  slug: string
  is_active: boolean
  is_featured: string
  total_sub_categories: number
  image: string | null
  created_at: string
  updated_at: string
}
  
export default Category